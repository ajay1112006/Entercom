'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function ScopeCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [smoothPosition, setSmoothPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const requestRef = useRef<number | null>(null);
  const targetPosRef = useRef({ x: -100, y: -100 });
  const currentPosRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Hide cursor on touch screens
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      targetPosRef.current = { x: e.clientX, y: e.clientY };
      setPosition({ x: e.clientX, y: e.clientY });

      if (!isVisible) setIsVisible(true);

      // Check element under cursor
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactiveEl = target.closest<HTMLElement>(
        'a, button, input, textarea, select, [role="button"], .cursor-target, [data-cursor-target]'
      );

      setIsHovered(!!interactiveEl);
    };

    const onMouseDown = () => setIsMouseDown(true);
    const onMouseUp = () => setIsMouseDown(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.body.addEventListener('mouseleave', onMouseLeave);
    document.body.addEventListener('mouseenter', onMouseEnter);

    // Smooth Lerp loop for trailing outer scope ring
    const animate = () => {
      const ease = 0.22;
      currentPosRef.current.x += (targetPosRef.current.x - currentPosRef.current.x) * ease;
      currentPosRef.current.y += (targetPosRef.current.y - currentPosRef.current.y) * ease;

      setSmoothPosition({
        x: currentPosRef.current.x,
        y: currentPosRef.current.y,
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.body.removeEventListener('mouseleave', onMouseLeave);
      document.body.removeEventListener('mouseenter', onMouseEnter);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  const primaryColor = isHovered ? '#f43f5e' : '#38bdf8';
  const glowColor = isHovered ? 'rgba(244, 63, 94, 0.4)' : 'rgba(56, 189, 248, 0.25)';

  return (
    <>
      {/* Global CSS to hide default browser cursor on desktop */}
      <style jsx global>{`
        @media (pointer: fine) {
          *, html, body, a, button, input, textarea, select, label, [role="button"], [data-cursor-target] {
            cursor: none !important;
          }
        }
      `}</style>

      {/* Container wrapper fixed to viewport */}
      <div className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden">
        
        {/* 1. Trailing Outer Scope Ring (Smooth Physics Lerp) */}
        <div
          className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out"
          style={{
            left: `${smoothPosition.x}px`,
            top: `${smoothPosition.y}px`,
          }}
        >
          <motion.div
            animate={{
              scale: isMouseDown ? 0.75 : isHovered ? 1.35 : 1,
              rotate: isHovered ? 45 : 0,
            }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="relative flex items-center justify-center"
            style={{ width: '48px', height: '48px' }}
          >
            {/* Outer Circular Scope Ring */}
            <div
              className="absolute inset-0 rounded-full border border-dashed transition-colors duration-200"
              style={{
                borderColor: primaryColor,
                boxShadow: `0 0 16px ${glowColor}`,
                opacity: 0.85,
              }}
            />

            {/* Scope Ticks (N, E, S, W) */}
            <div
              className="absolute -top-1 w-0.5 h-2.5 transition-colors duration-200"
              style={{ backgroundColor: primaryColor }}
            />
            <div
              className="absolute -bottom-1 w-0.5 h-2.5 transition-colors duration-200"
              style={{ backgroundColor: primaryColor }}
            />
            <div
              className="absolute -left-1 h-0.5 w-2.5 transition-colors duration-200"
              style={{ backgroundColor: primaryColor }}
            />
            <div
              className="absolute -right-1 h-0.5 w-2.5 transition-colors duration-200"
              style={{ backgroundColor: primaryColor }}
            />

            {/* Tactical Target Locking Corner Brackets */}
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                className="absolute inset-[-6px] border border-rose-500/80 rounded-sm pointer-events-none"
              >
                <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-rose-500" />
                <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-rose-500" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-rose-500" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-rose-500" />
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* 2. Instant Cursor Center Dot & Precise Crosshair */}
        <div
          className="absolute transform -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
          }}
        >
          <div className="relative flex items-center justify-center w-6 h-6">
            
            {/* Center Red/Cyan Aiming Dot */}
            <motion.div
              animate={{
                scale: isMouseDown ? 1.6 : isHovered ? 1.2 : 1,
              }}
              className="w-1.5 h-1.5 rounded-full transition-colors duration-150 shadow-lg"
              style={{
                backgroundColor: primaryColor,
                boxShadow: `0 0 10px ${primaryColor}`,
              }}
            />

            {/* Inner Precision Crosshair Lines */}
            <div
              className="absolute w-4 h-[1px] opacity-70"
              style={{ backgroundColor: primaryColor }}
            />
            <div
              className="absolute h-4 w-[1px] opacity-70"
              style={{ backgroundColor: primaryColor }}
            />

            {/* Click Recoil Shockwave Burst */}
            <AnimatePresence>
              {isMouseDown && (
                <motion.div
                  initial={{ scale: 0.5, opacity: 0.9 }}
                  animate={{ scale: 2.8, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="absolute w-8 h-8 rounded-full border border-rose-400"
                  style={{ boxShadow: '0 0 20px rgba(244,63,94,0.6)' }}
                />
              )}
            </AnimatePresence>

          </div>
        </div>

      </div>
    </>
  );
}

export default ScopeCursor;
