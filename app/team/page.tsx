'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { TEAM_MEMBERS } from '@/data/team';
import { TeamCard } from '@/components/TeamCard';
import { MagneticCarousel } from '@/components/MagneticCarousel';
import { BorderGlow } from '@/components/BorderGlow';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Sparkles, Users, Award, HeartHandshake, MousePointer2, LayoutGrid } from 'lucide-react';
import { ThreeDTextReveal } from '@/components/ThreeDTextReveal';
import { ScrollReveal, ScrollRevealGroup, ScrollRevealItem } from '@/components/ScrollReveal';

export default function TeamPage() {
  const [viewMode, setViewMode] = useState<'magnetic' | 'grid'>('magnetic');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 pb-24">
      {/* Header Banner */}
      <ScrollReveal direction="up" blur={4}>
        <div className="space-y-4 max-w-5xl">
          <Badge variant="purple">Team & Culture</Badge>
          <ThreeDTextReveal
            text="Meet the Minds Behind Entercom"
            as="h1"
            className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-display whitespace-nowrap"
            rotationX={-75}
            stagger={0.04}
          />
          <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-3xl">
            We are a tight-knit collective of senior web architects, motion designers, and performance engineers united by a passion for world-class web experiences.
          </p>
        </div>
      </ScrollReveal>

      {/* Agency Ethos Grid */}
      <ScrollRevealGroup stagger={0.12} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ScrollRevealItem direction="zoom" blur={6}>
          <BorderGlow
            borderRadius={20}
            glowColor="250 85 75"
            colors={['#6366f1', '#a855f7', '#3b82f6']}
            animated={true}
            glowIntensity={1.1}
            glowRadius={30}
            backgroundColor="#0d0b1a"
            className="h-full"
          >
            <div className="p-6 space-y-3 h-full">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Direct Senior Access</h3>
              <p className="text-white/60 text-xs leading-relaxed">
                No junior handoffs or account manager delays. You work directly with the senior engineers and designers building your site.
              </p>
            </div>
          </BorderGlow>
        </ScrollRevealItem>

        <ScrollRevealItem direction="zoom" blur={6}>
          <BorderGlow
            borderRadius={20}
            glowColor="250 85 75"
            colors={['#a855f7', '#ec4899', '#6366f1']}
            animated={true}
            glowIntensity={1.1}
            glowRadius={30}
            backgroundColor="#0d0b1a"
            className="h-full"
          >
            <div className="p-6 space-y-3 h-full">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Uncompromising Quality</h3>
              <p className="text-white/60 text-xs leading-relaxed">
                We treat every client website as a flagship asset. We measure success by speed scores, conversion metrics, and design awards.
              </p>
            </div>
          </BorderGlow>
        </ScrollRevealItem>

        <ScrollRevealItem direction="zoom" blur={6}>
          <BorderGlow
            borderRadius={20}
            glowColor="250 85 75"
            colors={['#10b981', '#3b82f6', '#6366f1']}
            animated={true}
            glowIntensity={1.1}
            glowRadius={30}
            backgroundColor="#0d0b1a"
            className="h-full"
          >
            <div className="p-6 space-y-3 h-full">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Long-term Client Partnership</h3>
              <p className="text-white/60 text-xs leading-relaxed">
                Our relationship doesn&apos;t end at launch. We provide ongoing performance audits, feature iterations, and edge updates.
              </p>
            </div>
          </BorderGlow>
        </ScrollRevealItem>
      </ScrollRevealGroup>

      {/* Team Members Display Section */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-surface-border pb-4 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white font-display">Leadership & Core Team</h2>
            <p className="text-xs text-white/50 pt-0.5">Hover across the dock to magnify • Click any image bar to expand profile</p>
          </div>

          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-surface-card border border-surface-border shrink-0 self-start sm:self-auto">
            <button
              onClick={() => setViewMode('magnetic')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium transition-all ${
                viewMode === 'magnetic'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <MousePointer2 className="w-3.5 h-3.5" />
              Magnetic Dock
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium transition-all ${
                viewMode === 'grid'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              Grid View
            </button>
          </div>
        </div>

        {/* Magnetic Dock or Grid View */}
        {viewMode === 'magnetic' ? (
          <div className="w-full overflow-hidden no-scrollbar min-h-[460px] flex items-center justify-center py-4">
            <MagneticCarousel members={TEAM_MEMBERS} />
          </div>
        ) : (
          <ScrollRevealGroup stagger={0.12} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {TEAM_MEMBERS.map((member) => (
              <ScrollRevealItem key={member.id} direction="up" blur={6}>
                <TeamCard member={member} />
              </ScrollRevealItem>
            ))}
          </ScrollRevealGroup>
        )}
      </div>

      {/* Join the Team CTA */}
      <ScrollReveal direction="zoom" blur={8}>
        <BorderGlow
          borderRadius={28}
          glowColor="250 85 75"
          colors={['#6366f1', '#a855f7', '#ec4899', '#3b82f6']}
          animated={true}
          glowIntensity={1.3}
          glowRadius={40}
          backgroundColor="#0d0b1a"
          className="p-8 sm:p-12 text-center space-y-4 max-w-3xl mx-auto shadow-2xl"
        >
          <Sparkles className="w-8 h-8 text-amber-400 mx-auto" />
          <ThreeDTextReveal
            text="Want to Build Great Web Apps With Us?"
            as="h3"
            className="text-2xl font-bold text-white"
            rotationX={-70}
          />
          <p className="text-white/60 text-sm max-w-lg mx-auto">
            We are always looking for exceptional Next.js engineers and motion designers who are passionate about pushing web boundaries.
          </p>
          <div className="pt-2">
            <Link href="/contact">
              <Button variant="outline" size="md">
                Reach Out / Inquire
              </Button>
            </Link>
          </div>
        </BorderGlow>
      </ScrollReveal>
    </div>
  );
}
