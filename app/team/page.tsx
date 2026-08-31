'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { TEAM_MEMBERS } from '@/data/team';
import { TeamCard } from '@/components/TeamCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Sparkles, Users, Award, ShieldCheck, HeartHandshake } from 'lucide-react';

export default function TeamPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 pb-24">
      {/* Header Banner */}
      <div className="space-y-4 max-w-3xl">
        <Badge variant="purple">Team & Culture</Badge>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight font-display">
          Meet the Minds Behind Entercom
        </h1>
        <p className="text-white/70 text-base sm:text-lg leading-relaxed">
          We are a tight-knit collective of senior web architects, motion designers, and performance engineers united by a passion for world-class web experiences.
        </p>
      </div>

      {/* Agency Ethos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-surface-card border border-surface-border space-y-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Users className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">Direct Senior Access</h3>
          <p className="text-white/60 text-xs leading-relaxed">
            No junior handoffs or account manager delays. You work directly with the senior engineers and designers building your site.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-surface-card border border-surface-border space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">Uncompromising Quality</h3>
          <p className="text-white/60 text-xs leading-relaxed">
            We treat every client website as a flagship asset. We measure success by speed scores, conversion metrics, and design awards.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-surface-card border border-surface-border space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">Long-term Client Partnership</h3>
          <p className="text-white/60 text-xs leading-relaxed">
            Our relationship doesn&apos;t end at launch. We provide ongoing performance audits, feature iterations, and edge updates.
          </p>
        </div>
      </div>

      {/* Team Members Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-surface-border pb-4">
          <h2 className="text-2xl font-bold text-white font-display">Leadership & Core Team</h2>
          <span className="text-xs font-mono text-white/50">{TEAM_MEMBERS.length} Specialists</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {TEAM_MEMBERS.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>
      </div>

      {/* Join the Team CTA */}
      <div className="p-8 sm:p-12 rounded-3xl bg-surface-card border border-surface-border text-center space-y-4 max-w-3xl mx-auto">
        <Sparkles className="w-8 h-8 text-amber-400 mx-auto" />
        <h3 className="text-2xl font-bold text-white">Want to Build Great Web Apps With Us?</h3>
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
      </div>
    </div>
  );
}
