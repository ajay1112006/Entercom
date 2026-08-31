'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { BorderGlow } from '../BorderGlow';

interface CardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  colors?: string[];
  animated?: boolean;
}

export function Card({
  children,
  className,
  glowColor = '250 85 75',
  colors = ['#818cf8', '#c084fc', '#f472b6'],
  animated = false,
  onClick,
  ...props
}: CardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="h-full"
      {...props}
    >
      <BorderGlow
        glowColor={glowColor}
        colors={colors}
        animated={animated}
        edgeSensitivity={30}
        glowRadius={35}
        glowIntensity={1.2}
        coneSpread={28}
        backgroundColor="#13131a"
        borderRadius={24}
        className={twMerge(clsx('h-full', className))}
        onClick={onClick as React.MouseEventHandler<HTMLDivElement>}
      >
        {children}
      </BorderGlow>
    </motion.div>
  );
}
