'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight, TrendingUp, Sparkles, ExternalLink } from 'lucide-react';
import { Project } from '../types';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

export function ProjectCard({ project, onSelect }: ProjectCardProps) {
  return (
    <Card
      onClick={() => onSelect(project)}
      className="group cursor-pointer flex flex-col h-full bg-surface-card hover:border-indigo-500/40 transition-colors"
    >
      {/* Image Container with Shimmer & Zoom Effect */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-neutral-900">
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out opacity-90 group-hover:opacity-100"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-surface-card via-transparent to-transparent opacity-80" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <Badge variant="purple" size="sm">
            {project.category}
          </Badge>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono text-white/80 bg-black/60 backdrop-blur-md border border-white/10">
            {project.year}
          </span>
        </div>

        {/* Hover External Icon Pill */}
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center shadow-lg transform group-hover:translate-x-0 group-hover:translate-y-0 translate-y-2 transition-transform">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors leading-tight">
              {project.title}
            </h3>
            <span className="text-xs font-mono text-white/40 shrink-0">{project.client}</span>
          </div>
          <p className="text-white/60 text-sm line-clamp-2 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Key Metric Banner */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between text-xs">
            <span className="text-white/50 flex items-center gap-1.5 font-medium">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              {project.metrics[0].label}
            </span>
            <span className="font-mono font-bold text-emerald-400">
              {project.metrics[0].value}
            </span>
          </div>
        )}

        {/* Tech Stack Tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-mono text-white/50 bg-white/5 px-2 py-0.5 rounded-md border border-white/5"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="text-[11px] font-mono text-white/40 px-1 py-0.5">
              +{project.tags.length - 3}
            </span>
          )}
        </div>
      </div>
    </Card>
  );
}
