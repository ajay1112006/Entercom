'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface ThreeDTextRevealProps {
  /** The text string to animate */
  text: string;
  /** HTML element type to render */
  as?: React.ElementType;
  /** Granularity of text splitting */
  splitBy?: 'words' | 'chars' | 'lines';
  /** Perspective distance in px */
  perspective?: number;
  /** Initial rotation on X axis in degrees */
  rotationX?: number;
  /** Initial rotation on Y axis in degrees */
  rotationY?: number;
  /** Initial Z depth displacement */
  z?: number;
  /** Initial Y displacement in px */
  y?: number;
  /** Initial opacity */
  initialOpacity?: number;
  /** Initial blur filter in px */
  blur?: number;
  /** Duration of animation per unit */
  duration?: number;
  /** Stagger time between units */
  stagger?: number;
  /** Enable scroll scrubbing (true / false / scrub value) */
  scrub?: boolean | number;
  /** GSAP ScrollTrigger start trigger position */
  triggerStart?: string;
  /** GSAP ScrollTrigger end trigger position */
  triggerEnd?: string;
  /** Easing function string */
  ease?: string;
  /** Custom container class name */
  className?: string;
  /** Custom unit span class name */
  unitClassName?: string;
  /** Re-trigger on scroll back up */
  once?: boolean;
}

export function ThreeDTextReveal({
  text,
  as: Component = 'div',
  splitBy = 'words',
  perspective = 1000,
  rotationX = -85,
  rotationY = 0,
  z = -60,
  y = 40,
  initialOpacity = 0,
  blur = 6,
  duration = 0.85,
  stagger = 0.04,
  scrub = false,
  triggerStart = 'top 85%',
  triggerEnd = 'top 35%',
  ease = 'power3.out',
  className,
  unitClassName,
  once = true,
}: ThreeDTextRevealProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const units = el.querySelectorAll<HTMLSpanElement>('.reveal-3d-unit');
    if (!units.length) return;

    // Reset initial styles
    gsap.set(units, {
      transformPerspective: perspective,
      transformStyle: 'preserve-3d',
      rotationX,
      rotationY,
      z,
      y,
      opacity: initialOpacity,
      filter: blur > 0 ? `blur(${blur}px)` : 'none',
      backfaceVisibility: 'hidden',
    });

    const ctx = gsap.context(() => {
      const scrollTriggerConfig: ScrollTrigger.Vars = {
        trigger: el,
        start: triggerStart,
        end: triggerEnd,
        toggleActions: once ? 'play none none none' : 'play reverse play reverse',
      };

      if (scrub) {
        scrollTriggerConfig.scrub = typeof scrub === 'number' ? scrub : 0.8;
      }

      gsap.to(units, {
        rotationX: 0,
        rotationY: 0,
        z: 0,
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration,
        stagger: scrub ? 0.02 : stagger,
        ease,
        scrollTrigger: scrollTriggerConfig,
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [
    text,
    splitBy,
    perspective,
    rotationX,
    rotationY,
    z,
    y,
    initialOpacity,
    blur,
    duration,
    stagger,
    scrub,
    triggerStart,
    triggerEnd,
    ease,
    once,
  ]);

  // Split text into lines, words, or characters
  const renderUnits = () => {
    if (splitBy === 'lines') {
      const lines = text.split('\n');
      return lines.map((line, idx) => (
        <span key={idx} className="block overflow-hidden py-1">
          <span
            className={cn(
              'reveal-3d-unit inline-block origin-bottom transition-colors transform-gpu',
              unitClassName
            )}
          >
            {line}
          </span>
        </span>
      ));
    }

    if (splitBy === 'chars') {
      const chars = Array.from(text);
      return (
        <span className="inline-flex flex-wrap gap-x-[0.2em] gap-y-1">
          {chars.map((char, idx) => (
            <span
              key={idx}
              className={cn(
                'reveal-3d-unit inline-block origin-center transform-gpu',
                unitClassName
              )}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </span>
      );
    }

    // Default: words
    const words = text.split(' ');
    return (
      <span className="inline-flex flex-wrap gap-x-[0.28em] gap-y-1.5 justify-center">
        {words.map((word, idx) => (
          <span key={idx} className="inline-block overflow-visible">
            <span
              className={cn(
                'reveal-3d-unit inline-block origin-bottom transform-gpu',
                unitClassName
              )}
            >
              {word}
            </span>
          </span>
        ))}
      </span>
    );
  };

  return (
    <Component
      ref={containerRef}
      className={cn('relative perspective-1000 font-display', className)}
      style={{ perspective: `${perspective}px` }}
    >
      {renderUnits()}
    </Component>
  );
}

export default ThreeDTextReveal;
