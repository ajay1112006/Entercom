'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS_DATA } from '@/data/projects';
import { ProjectCard } from '@/components/ProjectCard';
import { ProjectModal } from '@/components/ProjectModal';
import { RoundCarousel } from '@/components/RoundCarousel';
import { Badge } from '@/components/ui/Badge';
import { Project } from '@/types';
import { ThreeDTextReveal } from '@/components/ThreeDTextReveal';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Orbit, LayoutGrid, Hand } from 'lucide-react';

export default function ProjectsPage() {
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 pb-24">
      {/* Header Banner & Mode Controls */}
      <ScrollReveal direction="up" blur={4}>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4 max-w-3xl">
            <Badge variant="purple">Portfolio Showcase</Badge>
            <ThreeDTextReveal
              text="Client Work & Case Studies"
              as="h1"
              className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight font-display"
              rotationX={-75}
              stagger={0.04}
            />
            <p className="text-white/70 text-base sm:text-lg leading-relaxed">
              Explore the bespoke web applications, enterprise portals, and high-performance platforms we have engineered for clients.
            </p>
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-surface-card border border-surface-border shrink-0 self-start md:self-auto">
            <button
              onClick={() => setViewMode('carousel')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all ${
                viewMode === 'carousel'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <Orbit className="w-4 h-4" />
              3D Round Carousel
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all ${
                viewMode === 'grid'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              Grid View
            </button>
          </div>
        </div>
      </ScrollReveal>

      {/* Main Display Area */}
      <AnimatePresence mode="wait">
        {viewMode === 'carousel' ? (
          <motion.div
            key="3d-carousel"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.4 }}
            className="space-y-4"
          >
            {/* Carousel Container Box */}
            <div className="relative h-[560px] sm:h-[620px] w-full rounded-3xl overflow-hidden flex flex-col justify-between p-4">
              
              {/* Drag Indicator Pill */}
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20 pointer-events-none flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs font-mono text-white/70">
                <Hand className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
                <span>Drag to spin 3D carousel • Click card to view details</span>
              </div>

              {/* 3D Round Carousel */}
              <div className="w-full h-full pt-8">
                <RoundCarousel
                  projects={PROJECTS_DATA}
                  onSelectProject={setActiveModalProject}
                  imageWidth={320}
                  imageHeight={400}
                  spacing={3.6}
                  speed={1.5}
                  tilt={-6}
                  perspective={2600}
                  cornerRadius={22}
                />
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="grid-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {PROJECTS_DATA.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onSelect={setActiveModalProject}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Case Study Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </div>
  );
}
