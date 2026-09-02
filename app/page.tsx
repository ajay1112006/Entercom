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
import { ThreeDTextReveal } from '@/components/ThreeDTextReveal';
import { ScrollReveal, ScrollRevealGroup, ScrollRevealItem } from '@/components/ScrollReveal';
import AccordionGallery from '@/components/AccordionGallery';
import ScrollExpand from '@/components/ScrollExpand';
import DepthCarousel from '@/components/DepthCarousel';
import DriftWall from '@/components/DriftWall';
import { BorderGlow } from '@/components/BorderGlow';

import { AeroShards } from '@/components/AeroShards';

const PROJECT_SLIDE_ITEMS = PROJECTS_DATA.map((project) => ({
  id: project.id,
  image: project.imageUrl,
  imageUrl: project.imageUrl,
  title: project.title,
  category: project.category,
  client: project.client,
  description: project.description,
  impact: project.impact,
  metrics: project.metrics,
  alt: project.title,
  rawProject: project,
}));

const PROCESS_CAROUSEL_ITEMS = PROCESS_STEPS.map((step, i) => {
  const processImages = [
    'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
  ];
  return {
    id: step.step,
    image: processImages[i % processImages.length],
    title: step.title,
    category: `Phase ${step.step}`,
    description: step.description,
    alt: step.title,
  };
});

const DRIFT_WALL_ITEMS = TESTIMONIALS_DATA.map((t, i) => {
  const bgImages = [
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=800&auto=format&fit=crop',
  ];
  return {
    id: t.id,
    image: bgImages[i % bgImages.length],
    quote: t.quote,
    author: t.author,
    role: t.role,
    company: t.company,
    avatarUrl: t.avatarUrl,
    rating: t.rating,
  };
});

const SERVICE_GALLERY_ITEMS = [
  {
    id: 'custom-web',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop',
    label: 'Custom Next.js Engineering',
    subtitle: 'High-Performance Web Applications',
    description: 'We build bespoke, production-ready websites for clients using Next.js App Router, TypeScript, and server-side optimization. Zero bloat, instant hydration, and 100/100 performance scores.',
    badge: 'Core Specialty',
    iconName: 'Code2' as const,
    deliverables: [
      'Next.js App Router Architecture',
      'TypeScript strict typing',
      'SEO & OpenGraph optimization',
      'Tailwind CSS custom design system',
      'Vercel automated CI/CD deployment'
    ],
  },
  {
    id: 'motion-webgl',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
    label: 'Motion & Interactive Design',
    subtitle: 'Immersive Web Micro-Interactions',
    description: 'Elevate your brand beyond flat static web pages. We implement fluid scroll triggers, Framer Motion transitions, physics-based UI elements, and WebGL particle effects that captivate visitors.',
    badge: 'Award Winning',
    iconName: 'Sparkles' as const,
    deliverables: [
      'Scroll-driven story animations',
      'Smooth page transition choreography',
      'Custom hover states & cursor dynamics',
      '3D element embedding',
      'Responsive touch gestures'
    ],
  },
  {
    id: 'headless-ecommerce',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
    label: 'Headless E-Commerce Flagships',
    subtitle: 'Scalable Commerce Systems',
    description: 'High-converting online store experiences powered by Next.js and headless commerce APIs (Shopify, Stripe, Medusa). Custom product visualizers, instant checkout flows, and sub-second page switches.',
    badge: 'High Conversion',
    iconName: 'ShoppingBag' as const,
    deliverables: [
      'Custom Shopify storefront integration',
      'Sub-second product catalog search',
      'Optimized cart & checkout drawer',
      'Global currency & localization',
      'High conversion UX audit'
    ],
  },
  {
    id: 'design-systems',
    image: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=1200&auto=format&fit=crop',
    label: 'Brand Identity & Design Systems',
    subtitle: 'Scalable Visual Tokens',
    description: 'We build comprehensive Figma design systems complete with reusable React component libraries, dark/light token architecture, visual documentation, and brand guidelines.',
    badge: 'Design System',
    iconName: 'Palette' as const,
    deliverables: [
      'Figma to Code token synchronization',
      'Accessible React component libraries',
      'Typography & Color scale design',
      'Interactive component storybooks',
      'Cross-platform brand assets'
    ],
  },
  {
    id: 'speed-seo',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
    label: 'Core Web Vitals & Technical SEO',
    subtitle: 'Lightning Fast Page Velocity',
    description: 'Transform sluggish legacy sites into speed demons. We perform deep memory leak audits, image pipeline optimization, code splitting, edge caching, and semantic HTML enhancements.',
    badge: 'Speed Demon',
    iconName: 'Zap' as const,
    deliverables: [
      '99+ Lighthouse performance guarantee',
      'Cumulative Layout Shift (CLS) elimination',
      'Dynamic edge caching strategy',
      'Structured JSON-LD schema markup',
      'Comprehensive Core Web Vitals audit'
    ],
  },
];

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
            <div className="w-full max-w-4xl mx-auto pt-2 h-16 sm:h-20 relative">
              <WarpText
                text={"Entercom is a specialized web agency. We design and engineer production-ready,\nanimation-rich Next.js websites for startups and ambitious brands."}
                color="#ffffff"
                fontSize="clamp(0.95rem, 1.8vw, 1.15rem)"
                fontWeight={500}
                fontFamily="Inter, sans-serif"
                lineHeight="28px"
                letterSpacing="0.01em"
                warpStrength={0.06}
                warpScale={1.6}
                speed={0.45}
                pointerInfluence={0.35}
                pointerStrength={0.32}
              />
            </div>
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
      {/* FEATURED PROJECTS SHOWCASE (SCROLL EXPAND) */}
      {/* ========================================================================= */}
      {/* ========================================================================= */}
      {/* FEATURED PROJECTS SHOWCASE (SCROLL EXPAND FULLSCREEN SLIDES) */}
      {/* ========================================================================= */}
      <section className="relative w-full">
        <ScrollExpand
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1600&auto=format&fit=crop"
          alt="Bespoke Websites Delivered for Clients"
          title="Bespoke Websites Delivered for Clients"
          scrollHint="Scroll down to expand fullscreen showcase"
          useWindowScroll={true}
          startWidth={44}
          startHeight={58}
          startRadius={24}
          endRadius={0}
          mediaZoom={1.35}
          scrollDistance={0.9}
          holdDistance={3.2}
          overlayScrim={0.88}
          projects={PROJECT_SLIDE_ITEMS}
          onProjectClick={(proj) => setSelectedProject(proj)}
        />
      </section>

      {/* ========================================================================= */}
      {/* SERVICES & CORE CAPABILITIES */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <ScrollReveal direction="up" blur={4}>
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <Badge variant="amber">
              Our Expertise
            </Badge>
            <ThreeDTextReveal
              text="End-To-End Web Development Services"
              as="h2"
              className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight"
              rotationX={-80}
              stagger={0.03}
              blur={8}
            />
            <p className="text-white/60 text-base">
              From initial wireframing to custom Next.js engineering and Vercel edge deployment, we handle every detail of building your web presence.
            </p>
          </div>
        </ScrollReveal>

        {/* Interactive Accordion Gallery for Services */}
        <ScrollReveal direction="zoom" blur={8} distance={30}>
          <div className="p-3 sm:p-4 rounded-3xl bg-surface-card/80 border border-surface-border backdrop-blur-xl shadow-2xl overflow-hidden">
            <AccordionGallery
              items={SERVICE_GALLERY_ITEMS}
              defaultIndex={0}
              height={500}
              expandRatio={0.58}
              trigger="hover"
              grayscale={true}
              parallax={0.6}
              accentColor="#6366f1"
              overlayColor="#070709"
              radius={20}
              gap={12}
            />
          </div>
        </ScrollReveal>
      </section>

      {/* ========================================================================= */}
      {/* AGENCY PROCESS / WHY ENTERCOM */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <ScrollReveal direction="up" blur={8} distance={40}>
          <BorderGlow
            borderRadius={28}
            glowColor="250 85 75"
            colors={['#6366f1', '#a855f7', '#ec4899']}
            animated={true}
            glowIntensity={1.2}
            glowRadius={40}
            backgroundColor="#0a0814"
            className="p-8 sm:p-12 relative overflow-hidden shadow-2xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              <div className="lg:col-span-5 space-y-6">
                <Badge variant="purple">The Entercom Approach</Badge>
                <ThreeDTextReveal
                  text="How We Take Your Website From Concept to Launch"
                  as="h2"
                  className="text-2xl sm:text-4xl font-bold text-white tracking-tight"
                  rotationX={-75}
                  stagger={0.03}
                />
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

              {/* 3D Depth Carousel for Process Steps */}
              <div className="lg:col-span-7 h-[460px] relative w-full overflow-hidden flex items-center justify-center">
                <DepthCarousel
                  items={PROCESS_CAROUSEL_ITEMS}
                  cardWidth={290}
                  cardHeight={390}
                  depth={200}
                  spread={85}
                  tilt={20}
                  tiltDirection="right"
                  perspective={1400}
                  visibleCards={4}
                  falloff={0.2}
                  blur={6}
                  autoplay={true}
                  autoplayDelay={3600}
                  loop={true}
                  showControls={true}
                  showIndicators={true}
                />
              </div>

            </div>
          </BorderGlow>
        </ScrollReveal>
      </section>

      {/* ========================================================================= */}
      {/* TESTIMONIALS */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <ScrollReveal direction="up" blur={4}>
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <Badge variant="glow">Client Feedback</Badge>
            <ThreeDTextReveal
              text="Loved By Tech Founders & Creative Leaders"
              as="h2"
              className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
              rotationX={-85}
              stagger={0.03}
            />
          </div>
        </ScrollReveal>

        {/* 3D Drift Wall Showcase for Client Testimonials */}
        <ScrollReveal direction="zoom" blur={8} distance={30}>
          <div className="h-[500px] sm:h-[540px] w-full relative overflow-hidden flex items-center justify-center">
            <DriftWall
              items={DRIFT_WALL_ITEMS}
              columns={4}
              tileWidth={260}
              tileHeight={180}
              gap={20}
              tilt={14}
              turn={-12}
              perspective={1200}
              depth={100}
              speed={36}
              direction="up"
              variance={0.45}
              parallax={0.6}
              lift={60}
              fade={0.55}
              dim={0.6}
              overlayColor="#060010"
            />
          </div>
        </ScrollReveal>
      </section>

      {/* ========================================================================= */}
      {/* CTA BANNER */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="zoom" distance={30} blur={8}>
          <BorderGlow
            borderRadius={28}
            glowColor="250 85 75"
            colors={['#6366f1', '#a855f7', '#ec4899', '#3b82f6']}
            animated={true}
            glowIntensity={1.3}
            glowRadius={45}
            backgroundColor="#090714"
            className="p-10 sm:p-16 text-center space-y-6 relative overflow-hidden shadow-2xl"
          >
            <div className="relative z-10 space-y-4 max-w-2xl mx-auto">
              <ThreeDTextReveal
                text="Ready to Upgrade Your Website?"
                as="h2"
                className="text-3xl sm:text-5xl font-black text-white"
                rotationX={-90}
                duration={0.9}
                stagger={0.03}
              />
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
          </BorderGlow>
        </ScrollReveal>
      </section>

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
