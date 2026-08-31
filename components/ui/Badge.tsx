'use client';

import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'glow' | 'outline' | 'purple' | 'amber';
  size?: 'sm' | 'md';
  className?: string;
}

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  className,
}: BadgeProps) {
  const baseStyles = 'inline-flex items-center rounded-full font-mono font-medium tracking-wide uppercase transition-colors';
  
  const sizeStyles = {
    sm: 'px-2.5 py-0.5 text-[10px]',
    md: 'px-3 py-1 text-xs',
  };

  const variantStyles = {
    default: 'bg-white/10 text-white/80 border border-white/10',
    outline: 'bg-transparent text-white/70 border border-white/20',
    purple: 'bg-purple-500/10 text-purple-300 border border-purple-500/20',
    amber: 'bg-amber-500/10 text-amber-300 border border-amber-500/20',
    glow: 'relative bg-surface-card border border-white/15 text-white shadow-sm shadow-indigo-500/20',
  };

  return (
    <span className={twMerge(clsx(baseStyles, sizeStyles[size], variantStyles[variant], className))}>
      {variant === 'glow' && (
        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse mr-1.5 shrink-0" />
      )}
      {children}
    </span>
  );
}
