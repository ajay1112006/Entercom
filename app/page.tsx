'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Sparkles,
  Zap,
  ShieldCheck,
  Code2,
  Layers,
  CheckCircle,
  Star,
  ArrowUpRight,
  Gauge,
  MousePointer2,
} from 'lucide-react';

import { PROJECTS_DATA } from '@/data/projects';
import { SERVICES_DATA, PROCESS_STEPS } from '@/data/services';
import { TESTIMONIALS_DATA } from '@/data/testimonials';
import { ProjectCard } from '@/components/ProjectCard';
import { ProjectModal } from '@/components/ProjectModal';
import { ServiceCard } from '@/components/ServiceCard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Project } from '@/types';
import { WarpText } from '@/components/WarpText';
import { DepthText } from '@/components/DepthText';

import { AeroShards } from '@/components/AeroShards';

// Animation Variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export default function HomePage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const featuredProjects = PROJECTS_DATA.filter((p) => p.featured);

  return (
    <div className="space-y-24 sm:space-y-32 pb-20">
      {/* ========================================================================= */}
      {/* HERO SECTION */}
      {/* ========================================================================= */}
      <section className="relative pt-16 sm:pt-24 pb-20 overflow-hidden min-h-[80vh] flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 flex flex-col items-center gap-8">
          
          {/* Hero Main Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-3 max-w-5xl mx-auto flex flex-col items-center justify-center"
          >
            <h1 className="sr-only">We Build Bespoke Websites That Convert & Scale</h1>
            <div className="flex flex-col items-center justify-center gap-1 sm:gap-2">
              <DepthText
                text="WE BUILD BESPOKE"
                faceColor="#ffffff"
                depthColor="#6366f1"
                layers={26}
                depth={2.2}
                fontSize="clamp(2.2rem, 6.5vw, 5.2rem)"
                fontWeight={900}
              />
              <DepthText
                text="WEBSITES THAT CONVERT"
                faceColor="#c084fc"
                depthColor="#ec4899"
                layers={26}
                depth={2.2}
                fontSize="clamp(2.2rem, 6.5vw, 5.2rem)"
                fontWeight={900}
              />
              <DepthText
                text="& SCALE."
                faceColor="#38bdf8"
                depthColor="#6366f1"
                layers={26}
                depth={2.2}
                fontSize="clamp(2.2rem, 6.5vw, 5.2rem)"
                fontWeight={900}
              />
            </div>
            <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed font-normal pt-4">
              Entercom is a specialized web agency. We design and engineer production-ready, animation-rich Next.js websites for startups and ambitious brands.
            </p>
          </motion.div>

          {/* Hero CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
          >
            <Link href="/contact">
              <Button variant="glow" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
                Start Your Website Project
              </Button>
            </Link>
            <Link href="/projects">
              <Button variant="outline" size="lg" icon={<MousePointer2 className="w-4 h-4" />}>
                Explore Work
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* FEATURED PROJECTS SHOWCASE */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 border-b border-surface-border pb-6">
          <div>
            <Badge variant="purple" className="mb-2">
              Selected Work
            </Badge>
            <WarpText text="Bespoke Websites Delivered for Clients" fontSize="clamp(2.2rem, 4.5vw, 3.4rem)" style={{ height: '95px' }} />
            <p className="text-white/60 text-sm max-w-xl mt-1">
              Click any project card to view extended metrics, architecture, and live preview links.
            </p>
          </div>

          <Link href="/projects">
            <Button variant="ghost" size="sm" icon={<ArrowUpRight className="w-4 h-4" />}>
              View All Projects ({PROJECTS_DATA.length})
            </Button>
          </Link>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {featuredProjects.map((project) => (
            <motion.div key={project.id} variants={fadeIn}>
              <ProjectCard project={project} onSelect={setSelectedProject} />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ========================================================================= */}
      {/* SERVICES & CORE CAPABILITIES */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <Badge variant="amber">
            Our Expertise
          </Badge>
          <WarpText text="End-To-End Web Development Services" fontSize="clamp(2.4rem, 5vw, 3.8rem)" style={{ height: '110px' }} />
          <p className="text-white/60 text-base">
            From initial wireframing to custom Next.js engineering and Vercel edge deployment, we handle every detail of building your web presence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_DATA.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* AGENCY PROCESS / WHY ENTERCOM */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="p-8 sm:p-12 rounded-3xl bg-surface-card border border-surface-border relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-5 space-y-6">
              <Badge variant="purple">The Entercom Approach</Badge>
              <WarpText text="How We Take Your Website From Concept to Launch" fontSize="clamp(2.2rem, 4vw, 3.2rem)" style={{ height: '115px' }} />
              <p className="text-white/70 text-sm leading-relaxed">
                We eliminate agency clutter. No middle managers or slow turnarounds. You collaborate directly with senior architects and motion designers.
              </p>

              <ul className="space-y-3 text-sm text-white/80">
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <CheckCircle className="w-3.5 h-3.5" />
                  </div>
                  <span>Direct Slack access to your lead engineer</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <CheckCircle className="w-3.5 h-3.5" />
                  </div>
                  <span>Production deployments on Vercel Edge infrastructure</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <CheckCircle className="w-3.5 h-3.5" />
                  </div>
                  <span>Fully tested codebase with Vitest & Lighthouse verification</span>
                </li>
              </ul>
            </div>

            {/* Steps Timeline */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PROCESS_STEPS.map((step) => (
                <div
                  key={step.step}
                  className="p-5 rounded-2xl bg-surface-hover/80 border border-surface-border space-y-2 hover:border-indigo-500/30 transition-colors"
                >
                  <span className="text-xs font-mono font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded">
                    Phase {step.step}
                  </span>
                  <h3 className="text-base font-bold text-white">{step.title}</h3>
                  <p className="text-xs text-white/60 leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* TESTIMONIALS */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <Badge variant="glow">Client Feedback</Badge>
          <WarpText text="Loved By Tech Founders & Creative Leaders" fontSize="clamp(2.2rem, 4.5vw, 3.4rem)" style={{ height: '95px' }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS_DATA.map((t) => (
            <div
              key={t.id}
              className="p-6 rounded-2xl bg-surface-card border border-surface-border space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-white/80 text-sm italic font-serif leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-surface-border">
                <Image
                  src={t.avatarUrl}
                  alt={t.author}
                  width={40}
                  height={40}
                  className="rounded-full object-cover border border-white/10"
                />
                <div>
                  <h4 className="text-xs font-bold text-white">{t.author}</h4>
                  <span className="text-[11px] text-white/50">{t.role}, {t.company}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* CTA BANNER */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative p-10 sm:p-16 rounded-3xl bg-gradient-to-r from-indigo-900/60 via-purple-900/40 to-surface-card border border-indigo-500/30 text-center space-y-6 overflow-hidden shadow-2xl">
          
          <div className="relative z-10 space-y-4 max-w-2xl mx-auto">
            <WarpText text="Ready to Upgrade Your Website?" fontSize="clamp(2.5rem, 5.5vw, 4.2rem)" style={{ height: '120px' }} />
            <p className="text-white/70 text-base leading-relaxed">
              Let&apos;s build a stunning, production-grade Next.js website that elevates your brand and outruns the competition.
            </p>
            <div className="pt-2">
              <Link href="/contact">
                <Button variant="glow" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
                  Get a Proposal in 24 Hours
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
