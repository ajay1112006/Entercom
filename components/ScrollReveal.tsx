'use client';

import React, { ReactNode } from 'react';
import { motion, Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

export type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'zoom' | 'blur' | 'rotate';

export interface ScrollRevealProps {
  children: ReactNode;
  direction?: RevealDirection;
  delay?: number;
  duration?: number;
  distance?: number;
  blur?: number;
  scale?: number;
  once?: boolean;
  viewportMargin?: string;
  className?: string;
  staggerChildren?: number;
}

export function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.7,
  distance = 35,
  blur = 8,
  scale = 0.95,
  once = true,
  viewportMargin = '-60px',
  className,
}: ScrollRevealProps) {
  const getInitialState = () => {
    switch (direction) {
      case 'up':
        return { opacity: 0, y: distance, filter: blur ? `blur(${blur}px)` : 'none' };
      case 'down':
        return { opacity: 0, y: -distance, filter: blur ? `blur(${blur}px)` : 'none' };
      case 'left':
        return { opacity: 0, x: distance, filter: blur ? `blur(${blur}px)` : 'none' };
      case 'right':
        return { opacity: 0, x: -distance, filter: blur ? `blur(${blur}px)` : 'none' };
      case 'zoom':
        return { opacity: 0, scale, filter: blur ? `blur(${blur}px)` : 'none' };
      case 'blur':
        return { opacity: 0, filter: `blur(${blur + 6}px)` };
      case 'rotate':
        return { opacity: 0, y: distance, rotateX: 25, filter: blur ? `blur(${blur}px)` : 'none' };
      default:
        return { opacity: 0, y: distance };
    }
  };

  const getVisibleState = () => ({
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    rotateX: 0,
    filter: 'blur(0px)',
    transition: {
      duration,
      delay,
      ease: [0.21, 0.47, 0.32, 0.98],
    },
  });

  return (
    <motion.div
      initial={getInitialState()}
      whileInView={getVisibleState()}
      viewport={{ once, margin: viewportMargin }}
      className={cn('will-change-[transform,opacity,filter]', className)}
    >
      {children}
    </motion.div>
  );
}

export interface ScrollRevealGroupProps {
  children: ReactNode;
  stagger?: number;
  delay?: number;
  once?: boolean;
  viewportMargin?: string;
  className?: string;
}

export function ScrollRevealGroup({
  children,
  stagger = 0.12,
  delay = 0,
  once = true,
  viewportMargin = '-60px',
  className,
}: ScrollRevealGroupProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: delay,
        staggerChildren: stagger,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: viewportMargin }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export interface ScrollRevealItemProps {
  children: ReactNode;
  direction?: RevealDirection;
  distance?: number;
  duration?: number;
  blur?: number;
  className?: string;
}

export function ScrollRevealItem({
  children,
  direction = 'up',
  distance = 30,
  duration = 0.65,
  blur = 6,
  className,
}: ScrollRevealItemProps) {
  const getVariants = (): Variants => {
    let hiddenState = {};
    switch (direction) {
      case 'up':
        hiddenState = { opacity: 0, y: distance, filter: `blur(${blur}px)` };
        break;
      case 'down':
        hiddenState = { opacity: 0, y: -distance, filter: `blur(${blur}px)` };
        break;
      case 'left':
        hiddenState = { opacity: 0, x: distance, filter: `blur(${blur}px)` };
        break;
      case 'right':
        hiddenState = { opacity: 0, x: -distance, filter: `blur(${blur}px)` };
        break;
      case 'zoom':
        hiddenState = { opacity: 0, scale: 0.92, filter: `blur(${blur}px)` };
        break;
      default:
        hiddenState = { opacity: 0, y: distance, filter: `blur(${blur}px)` };
    }

    return {
      hidden: hiddenState,
      visible: {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        transition: {
          duration,
          ease: [0.21, 0.47, 0.32, 0.98],
        },
      },
    };
  };

  return (
    <motion.div variants={getVariants()} className={className}>
      {children}
    </motion.div>
  );
}
