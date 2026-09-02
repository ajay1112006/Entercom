'use client';

import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, TrendingUp, CheckCircle, Quote, Sparkles } from 'lucide-react';
import { Project } from '../types';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-xl"
        />

        {/* Dialog Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', duration: 0.5, bounce: 0.1 }}
          className="relative w-full max-w-3xl bg-surface-card border border-surface-border rounded-3xl overflow-hidden shadow-2xl z-10 my-8 max-h-[90vh] flex flex-col"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close project modal"
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-white/80 hover:text-white border border-white/10 hover:bg-black/90 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Banner Image */}
          <div className="relative w-full h-64 sm:h-80 bg-neutral-900 shrink-0">
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-card via-surface-card/40 to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <Badge variant="purple" className="mb-2">
                  {project.category}
                </Badge>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {project.title}
                </h2>
                <p className="text-sm font-mono text-white/60">Client: {project.client} • {project.year}</p>
              </div>
              
              {project.link && (
                <a href={project.link} target="_blank" rel="noreferrer">
                  <Button variant="glow" size="sm" icon={<ExternalLink className="w-3.5 h-3.5" />}>
                    Live Preview
                  </Button>
                </a>
              )}
            </div>
          </div>

          {/* Modal Scroll Body */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-white/80 text-sm leading-relaxed">
            
            {/* Impact Banner */}
            <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-200 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-white block mb-0.5">Project Impact</span>
                {project.impact}
              </div>
            </div>


            {/* Overview */}
            <div className="space-y-2">
              <h3 className="text-base font-semibold text-white">Overview & Challenge</h3>
              <p className="text-white/70">{project.fullDescription}</p>
            </div>

            {/* Testimonial Quote if exists */}
            {project.testimonial && (
              <div className="p-5 rounded-2xl bg-surface-hover border border-surface-border relative">
                <Quote className="w-8 h-8 text-white/10 absolute top-4 right-4" />
                <p className="italic text-white/90 mb-3 font-serif text-base">
                  &ldquo;{project.testimonial.quote}&rdquo;
                </p>
                <div className="text-xs">
                  <span className="font-bold text-white block">{project.testimonial.author}</span>
                  <span className="text-white/50">{project.testimonial.role}</span>
                </div>
              </div>
            )}

            {/* Tech Stack */}
            <div className="space-y-2 pt-2 border-t border-surface-border">
              <h4 className="text-xs font-mono uppercase text-white/40 tracking-wider">Technologies Used</h4>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs font-mono bg-white/10 text-white border border-white/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
