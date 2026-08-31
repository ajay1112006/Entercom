'use client';

import React, { useEffect, useRef } from 'react';
import './AeroShards.css';

export interface AeroShardsProps {
  backgroundColor?: string;
  shardColor?: string;
  accentColor?: string;
  placement?: 'right' | 'left' | 'center' | 'full';
  flow?: 'stream' | 'vortex' | 'ribbon';
  rippleIntensity?: number;
  holdToGather?: boolean;
  material?: 'pearl' | 'chrome' | 'satin';
  detail?: 'bold' | 'balanced' | 'fine';
  effect?: 'none' | 'dither' | 'ascii';
  scale?: number;
  spread?: number;
  depth?: number;
  speed?: number;
  spin?: number;
  interaction?: 'none' | 'repel' | 'attract';
  density?: number;
  shardSize?: number;
  stretch?: number;
  turbulence?: number;
  glow?: number;
  edgeSoftness?: number;
  bloom?: number;
  grain?: number;
  chromaticAberration?: number;
  transitionDuration?: number;
  interactionRadius?: number;
  interactionStrength?: number;
  paused?: boolean;
  className?: string;
  onError?: (error: Error) => void;
}

interface Shard {
  x: number;
  y: number;
  z: number; // Depth factor (0.2 - 2.0)
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  rotSpeed: number;
  aspect: number;
  color: string;
  alpha: number;
  targetAlpha: number;
}

export function AeroShards({
  backgroundColor = '#070709',
  shardColor = '#6366f1',
  accentColor = '#a855f7',
  placement = 'full',
  flow = 'stream',
  scale = 1,
  speed = 1,
  spin = 1,
  interaction = 'repel',
  density = 1.5,
  shardSize = 1.1,
  glow = 1.2,
  bloom = 0.6,
  paused = false,
  className = '',
}: AeroShardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -1000,
    y: -1000,
    active: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    const handleResize = () => {
      if (!canvas || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Mouse Tracking
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);
    }

    // Initialize Shard Particles
    const shardCount = Math.floor(120 * density);
    const shards: Shard[] = [];

    const colors = [shardColor, accentColor, '#818cf8', '#c084fc', '#e0e7ff'];

    for (let i = 0; i < shardCount; i++) {
      shards.push({
        x: Math.random() * (width || 1200),
        y: Math.random() * (height || 800),
        z: 0.3 + Math.random() * 1.5,
        vx: (Math.random() - 0.5) * 0.8 * speed,
        vy: (-0.4 - Math.random() * 0.8) * speed,
        size: (8 + Math.random() * 18) * shardSize * scale,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.02 * spin,
        aspect: 0.3 + Math.random() * 0.7,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 0.2 + Math.random() * 0.6,
        targetAlpha: 0.2 + Math.random() * 0.6,
      });
    }

    // Render Loop
    let time = 0;

    const render = () => {
      time += 0.016;

      // Clear Canvas
      ctx.clearRect(0, 0, width, height);

      // Render Ambient Radial Glow Background
      const glowGradient = ctx.createRadialGradient(
        width * 0.5,
        height * 0.4,
        50,
        width * 0.5,
        height * 0.4,
        Math.max(width, height) * 0.7
      );
      glowGradient.addColorStop(0, 'rgba(99, 102, 241, 0.18)');
      glowGradient.addColorStop(0.5, 'rgba(168, 85, 247, 0.08)');
      glowGradient.addColorStop(1, 'rgba(7, 7, 9, 0)');

      ctx.fillStyle = glowGradient;
      ctx.fillRect(0, 0, width, height);

      // Draw Shards
      for (let i = 0; i < shards.length; i++) {
        const shard = shards[i];

        if (!paused) {
          // Flow Motion Dynamics
          if (flow === 'stream') {
            shard.x += shard.vx + Math.sin(time + shard.z * 5) * 0.3;
            shard.y += shard.vy;
          } else if (flow === 'vortex') {
            const centerX = width / 2;
            const centerY = height / 2;
            const dx = shard.x - centerX;
            const dy = shard.y - centerY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const angle = Math.atan2(dy, dx) + 0.01 * speed;
            shard.x = centerX + Math.cos(angle) * dist;
            shard.y = centerY + Math.sin(angle) * dist;
          } else {
            // Ribbon flow
            shard.x += shard.vx + Math.cos(time * 0.8 + shard.y * 0.01) * 0.8;
            shard.y += shard.vy;
          }

          shard.rotation += shard.rotSpeed;

          // Wrap edges
          if (shard.y < -50) shard.y = height + 50;
          if (shard.y > height + 50) shard.y = -50;
          if (shard.x < -50) shard.x = width + 50;
          if (shard.x > width + 50) shard.x = -50;

          // Mouse Repel / Attract Interaction
          if (mouseRef.current.active && interaction !== 'none') {
            const dx = shard.x - mouseRef.current.x;
            const dy = shard.y - mouseRef.current.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const maxDist = 180;

            if (dist < maxDist && dist > 0) {
              const force = (1 - dist / maxDist) * (interaction === 'repel' ? 4 : -4);
              shard.x += (dx / dist) * force;
              shard.y += (dy / dist) * force;
            }
          }
        }

        // Render Shard Polygon (Diamond Shard)
        ctx.save();
        ctx.translate(shard.x, shard.y);
        ctx.rotate(shard.rotation);

        const w = shard.size * shard.z;
        const h = shard.size * shard.aspect * shard.z;

        // Shadow / Glow effect
        if (glow > 0) {
          ctx.shadowColor = shard.color;
          ctx.shadowBlur = 12 * glow * shard.z;
        }

        ctx.fillStyle = shard.color;
        ctx.globalAlpha = shard.alpha;

        // Polygon Shard Shape (Facet Diamond)
        ctx.beginPath();
        ctx.moveTo(0, -h);
        ctx.lineTo(w * 0.6, 0);
        ctx.lineTo(0, h);
        ctx.lineTo(-w * 0.6, 0);
        ctx.closePath();
        ctx.fill();

        // Shard Facet Highlight Line
        ctx.strokeStyle = '#ffffff';
        ctx.globalAlpha = shard.alpha * 0.4;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(0, -h);
        ctx.lineTo(0, h);
        ctx.stroke();

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [backgroundColor, shardColor, accentColor, flow, scale, speed, spin, interaction, density, shardSize, glow, bloom, paused]);

  return (
    <div
      ref={containerRef}
      className={`aero-shards-container ${className}`}
      style={{ backgroundColor }}
    >
      <canvas ref={canvasRef} className="aero-shards-canvas" />
    </div>
  );
}

export default AeroShards;
