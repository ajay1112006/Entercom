'use client';

import React, { useEffect, useRef } from 'react';

interface FluidGlassBlob {
  id: number;
  x: number; // Base X position
  y: number; // Base Y position
  z: number; // Depth layer: 1 (near) to 7 (far)
  baseRadius: number;
  pointsCount: number;
  pointPhases: number[];
  pointFrequencies: number[];
  pointAmplitudes: number[];
  primaryColor: string;
  accentColor: string;
  glowColor: string;
  parallaxFactor: number;
  directionX: number; // 1 or -1 for opposite X scroll drift
  directionY: number; // 1 or -1 for opposite Y scroll drift
  driftSpeedX: number;
  driftSpeedY: number;
}

export function Floating3DBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollYRef = useRef(0);
  const prevScrollYRef = useRef(0);
  const scrollVelocityRef = useRef(0);
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    const handleResize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const handleScroll = () => {
      const currentY = window.scrollY;
      scrollVelocityRef.current = (currentY - prevScrollYRef.current) * 0.4;
      prevScrollYRef.current = currentY;
      scrollYRef.current = currentY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Create translucent fluid glass droplets with opposite scroll directions
    const palettes = [
      { primary: 'rgba(99, 102, 241, 0.35)', accent: 'rgba(168, 85, 247, 0.25)', glow: '#818cf8' }, // Indigo-Purple
      { primary: 'rgba(168, 85, 247, 0.35)', accent: 'rgba(236, 72, 153, 0.25)', glow: '#c084fc' }, // Violet-Pink
      { primary: 'rgba(56, 189, 248, 0.35)', accent: 'rgba(99, 102, 241, 0.25)', glow: '#38bdf8' }, // Cyan-Indigo
      { primary: 'rgba(16, 185, 129, 0.35)', accent: 'rgba(56, 189, 248, 0.25)', glow: '#34d399' }, // Emerald-Cyan
      { primary: 'rgba(245, 158, 11, 0.35)', accent: 'rgba(236, 72, 153, 0.25)', glow: '#fbbf24' }, // Amber-Pink
    ];

    const blobs: FluidGlassBlob[] = [];
    const totalBlobs = 36;

    for (let i = 0; i < totalBlobs; i++) {
      const palette = palettes[i % palettes.length];
      const zDepth = 1 + Math.random() * 5.5;
      const pointsCount = 10 + Math.floor(Math.random() * 6);

      const pointPhases: number[] = [];
      const pointFrequencies: number[] = [];
      const pointAmplitudes: number[] = [];

      for (let p = 0; p < pointsCount; p++) {
        pointPhases.push(Math.random() * Math.PI * 2);
        pointFrequencies.push(0.8 + Math.random() * 1.8);
        pointAmplitudes.push(10 + Math.random() * 22);
      }

      // Alternate direction vectors for opposite scroll motion
      const directionY = i % 2 === 0 ? 1 : -1;  // Group A moves up, Group B moves DOWN on scroll
      const directionX = i % 3 === 0 ? 1 : -1;  // Alternate horizontal drift

      blobs.push({
        id: i,
        x: (Math.random() - 0.5) * width * 1.5,
        y: Math.random() * (height * 4.5) - height * 0.4,
        z: zDepth,
        baseRadius: (45 + Math.random() * 65) / (zDepth * 0.45),
        pointsCount,
        pointPhases,
        pointFrequencies,
        pointAmplitudes,
        primaryColor: palette.primary,
        accentColor: palette.accent,
        glowColor: palette.glow,
        parallaxFactor: 0.18 + (6.5 - zDepth) * 0.14,
        directionX,
        directionY,
        driftSpeedX: (Math.random() - 0.5) * 0.4,
        driftSpeedY: (Math.random() - 0.5) * 0.4,
      });
    }

    // ------------------------------------------------------------------------
    // OPPOSITE SCROLL DIRECTION FLUID GLASS RENDERER
    // ------------------------------------------------------------------------

    let time = 0;

    const render = () => {
      time += 0.012;

      // Dampen scroll velocity momentum
      scrollVelocityRef.current *= 0.92;

      // Smooth mouse position lerp
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      ctx.clearRect(0, 0, width, height);

      // Render each morphing fluid glass blob
      blobs.forEach((blob) => {
        // Calculate Opposite Direction Scroll Offsets
        // Blob Y offset moves in blob.directionY direction as user scrolls
        const scrollOffsetY = scrollYRef.current * blob.parallaxFactor * blob.directionY;
        const scrollOffsetX = scrollYRef.current * (blob.parallaxFactor * 0.4) * blob.directionX;

        // Position with continuous floating oscillation & opposite scroll motion
        const rawY = blob.y - scrollOffsetY + Math.sin(time + blob.id) * 16;
        const rawX = blob.x + scrollOffsetX + Math.cos(time * 0.6 + blob.id) * 16 + blob.driftSpeedX * time * 20;

        // Wrap around multi-screen viewport boundary seamlessly
        const cy = ((rawY % (height * 3.5)) + height * 3.5) % (height * 3.5) - height * 0.4;
        const cx = ((rawX % (width * 1.6)) + width * 1.6) % (width * 1.6) - width * 0.3;

        // Distance from cursor for liquid interaction ripple
        const dx = cx - mouseRef.current.x;
        const dy = cy - mouseRef.current.y;
        const mouseDist = Math.sqrt(dx * dx + dy * dy);
        const mouseRipple = mouseDist < 250 ? (1 - mouseDist / 250) * 22 : 0;

        // Alpha calculation based on depth layer
        const alpha = Math.max(0.2, 0.9 - blob.z * 0.1);

        // Generate fluid morphing vertex points
        const points: { x: number; y: number }[] = [];
        const numPts = blob.pointsCount;

        for (let p = 0; p < numPts; p++) {
          const angle = (p / numPts) * Math.PI * 2;
          const harmonic = Math.sin(time * blob.pointFrequencies[p] + blob.pointPhases[p]);
          const scrollHarmonic = Math.cos(time * 1.5 + scrollVelocityRef.current * 0.06);
          
          const radiusOffset =
            harmonic * blob.pointAmplitudes[p] +
            scrollHarmonic * 9 +
            mouseRipple * Math.sin(angle * 3 + time * 4);

          const r = Math.max(15, blob.baseRadius + radiusOffset);
          const px = cx + Math.cos(angle) * r;
          const py = cy + Math.sin(angle) * r;
          points.push({ x: px, y: py });
        }

        // Draw Morphing Liquid Glass Path with Smooth Bezier Curves
        ctx.save();
        ctx.globalAlpha = alpha;

        // Ambient Backlight Glow
        ctx.shadowColor = blob.glowColor;
        ctx.shadowBlur = 35 / blob.z;

        // Radial Liquid Glass Gradient Fill
        const glassGradient = ctx.createRadialGradient(
          cx - blob.baseRadius * 0.3,
          cy - blob.baseRadius * 0.3,
          blob.baseRadius * 0.1,
          cx,
          cy,
          blob.baseRadius * 1.4
        );
        glassGradient.addColorStop(0, 'rgba(255, 255, 255, 0.48)'); // Specular highlight core
        glassGradient.addColorStop(0.35, blob.primaryColor);       // Primary glass body
        glassGradient.addColorStop(0.8, blob.accentColor);          // Ambient border tint
        glassGradient.addColorStop(1, 'rgba(255, 255, 255, 0.05)');  // Outer glass sheen

        ctx.fillStyle = glassGradient;

        // Draw Smooth Bezier Fluid Curve
        ctx.beginPath();
        ctx.moveTo(
          (points[0].x + points[numPts - 1].x) / 2,
          (points[0].y + points[numPts - 1].y) / 2
        );

        for (let i = 0; i < numPts; i++) {
          const nextIdx = (i + 1) % numPts;
          const midX = (points[i].x + points[nextIdx].x) / 2;
          const midY = (points[i].y + points[nextIdx].y) / 2;
          ctx.quadraticCurveTo(points[i].x, points[i].y, midX, midY);
        }

        ctx.closePath();
        ctx.fill();

        // Delicate Liquid Glass Rim Border
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.lineWidth = 1.2 / blob.z;
        ctx.stroke();

        // Liquid Gloss Reflection Crescent
        ctx.beginPath();
        ctx.ellipse(
          cx - blob.baseRadius * 0.28,
          cy - blob.baseRadius * 0.28,
          blob.baseRadius * 0.32,
          blob.baseRadius * 0.16,
          -Math.PI / 4,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = 'rgba(255, 255, 255, 0.38)';
        ctx.fill();

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}

export default Floating3DBackground;
