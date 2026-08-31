'use client';

import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import RadialRevealButton from './RadialRevealButton';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glow';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  className,
  icon,
  iconPosition = 'right',
  type = 'button',
  disabled,
  onClick,
  style,
}: ButtonProps) {
  const paddingMap = {
    sm: '8px 18px',
    md: '12px 26px',
    lg: '16px 34px',
  };

  const fontSizeMap = {
    sm: 13,
    md: 14,
    lg: 16,
  };

  const variantColors = {
    primary: {
      fill: '#ffffff',
      textColor: '#000000',
      hoverFill: '#6366f1',
      hoverTextColor: '#ffffff',
      border: { borderWidth: 0, borderStyle: 'solid', borderColor: 'transparent' },
    },
    secondary: {
      fill: '#13131a',
      textColor: '#ffffff',
      hoverFill: '#a855f7',
      hoverTextColor: '#ffffff',
      border: { borderWidth: 1, borderStyle: 'solid', borderColor: 'rgba(255, 255, 255, 0.15)' },
    },
    outline: {
      fill: 'transparent',
      textColor: '#ffffff',
      hoverFill: '#ffffff',
      hoverTextColor: '#000000',
      border: { borderWidth: 1, borderStyle: 'solid', borderColor: 'rgba(255, 255, 255, 0.25)' },
    },
    ghost: {
      fill: 'transparent',
      textColor: 'rgba(255, 255, 255, 0.7)',
      hoverFill: 'rgba(255, 255, 255, 0.15)',
      hoverTextColor: '#ffffff',
      border: { borderWidth: 0, borderStyle: 'solid', borderColor: 'transparent' },
    },
    glow: {
      fill: '#6366f1',
      textColor: '#ffffff',
      hoverFill: '#ec4899',
      hoverTextColor: '#ffffff',
      border: { borderWidth: 0, borderStyle: 'solid', borderColor: 'transparent' },
    },
  };

  const selectedVariant = variantColors[variant];

  return (
    <RadialRevealButton
      type={type}
      disabled={disabled}
      onClick={onClick}
      padding={paddingMap[size]}
      rounded={100}
      font={{
        fontSize: fontSizeMap[size],
        fontWeight: 600,
        letterSpacing: '0.02em',
      }}
      colors={{
        fill: selectedVariant.fill,
        textColor: selectedVariant.textColor,
        hoverFill: selectedVariant.hoverFill,
        hoverTextColor: selectedVariant.hoverTextColor,
      }}
      border={selectedVariant.border}
      className={twMerge(clsx('select-none cursor-pointer tracking-wide', className))}
      style={style}
    >
      <div className="flex items-center gap-2">
        {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
        <span>{children}</span>
        {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
      </div>
    </RadialRevealButton>
  );
}
