'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Sparkles, ShoppingBag, Palette, Zap, Check } from 'lucide-react';
import { Service } from '../types';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';

const ICON_MAP: Record<string, React.ReactNode> = {
  Code2: <Code2 className="w-6 h-6 text-indigo-400" />,
  Sparkles: <Sparkles className="w-6 h-6 text-purple-400" />,
  ShoppingBag: <ShoppingBag className="w-6 h-6 text-pink-400" />,
  Palette: <Palette className="w-6 h-6 text-amber-400" />,
  Zap: <Zap className="w-6 h-6 text-emerald-400" />,
};

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Card className="group p-6 sm:p-8 flex flex-col justify-between bg-surface-card hover:border-indigo-500/40 transition-colors h-full">
      <div className="space-y-4">
        {/* Header Icon + Badge */}
        <div className="flex items-center justify-between">
          <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
            {ICON_MAP[service.icon] || <Sparkles className="w-6 h-6 text-white" />}
          </div>
          {service.badge && (
            <Badge variant="glow" size="sm">
              {service.badge}
            </Badge>
          )}
        </div>

        {/* Title & Description */}
        <div className="space-y-1">
          <span className="text-xs font-mono text-indigo-400 uppercase tracking-wider">
            {service.subtitle}
          </span>
          <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
            {service.title}
          </h3>
        </div>

        <p className="text-white/60 text-sm leading-relaxed">
          {service.description}
        </p>

        {/* Deliverables checklist */}
        <div className="pt-4 border-t border-surface-border space-y-2">
          <h4 className="text-xs font-mono text-white/40 uppercase tracking-wider">What We Deliver</h4>
          <ul className="space-y-2 text-xs text-white/80">
            {service.deliverables.map((item, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
                  <Check className="w-2.5 h-2.5 text-emerald-400" />
                </div>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
}
