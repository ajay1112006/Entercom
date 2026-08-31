'use client';

import React from 'react';
import { Badge } from '@/components/ui/Badge';
import { ContactForm } from '@/components/ContactForm';
import { Mail, Clock, MapPin, MessageSquare, CheckCircle } from 'lucide-react';
import { ThreeDTextReveal } from '@/components/ThreeDTextReveal';
import { ScrollReveal } from '@/components/ScrollReveal';

const FAQS = [
  {
    q: 'How fast can Entercom deliver a client website?',
    a: 'Typical custom Next.js landing pages take 2 to 3 weeks. Comprehensive web applications or e-commerce platforms average 4 to 6 weeks from initial sprint to launch.',
  },
  {
    q: 'What technologies do you use for client projects?',
    a: 'We build exclusively with Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion, and Vercel edge deployment for maximum speed and security.',
  },
  {
    q: 'Do you offer ongoing website maintenance & support?',
    a: 'Yes! We offer monthly retainer packages covering core web vitals monitoring, feature additions, content updates, and SEO optimization.',
  },
];

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 pb-24">
      {/* Header */}
      <ScrollReveal direction="up" blur={4}>
        <div className="space-y-4 max-w-3xl">
          <Badge variant="purple">Get in Touch</Badge>
          <ThreeDTextReveal
            text="Let's Build Something Extraordinary"
            as="h1"
            className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight font-display"
            rotationX={-75}
            stagger={0.04}
          />
          <p className="text-white/70 text-base sm:text-lg leading-relaxed">
            Ready to kick off your next website project? Fill out the project brief below or reach out directly to schedule a strategy call.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Form */}
        <div className="lg:col-span-7">
          <ContactForm />
        </div>

        {/* Right Column: Studio Contact Info & FAQs */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Studio Direct Info Card */}
          <div className="p-8 rounded-3xl bg-surface-card border border-surface-border space-y-6">
            <h3 className="text-xl font-bold text-white">Direct Communication</h3>

            <div className="space-y-4 text-sm text-white/80">
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs text-white/40 font-mono block">Inquiry Email</span>
                  <a href="mailto:hello@entercom.dev" className="text-white font-medium hover:text-indigo-400 transition-colors">
                    hello@entercom.dev
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs text-white/40 font-mono block">Studio Response Time</span>
                  <span className="text-white font-medium">Within 24 Business Hours</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs text-white/40 font-mono block">HQ Studio</span>
                  <span className="text-white font-medium">San Francisco & Remote Global</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-xs text-white/60 space-y-1">
              <span className="font-semibold text-white block">Vercel Deployment Guarantee</span>
              <p>Every website project comes ready to deploy to Vercel with 1-click CI/CD configuration included.</p>
            </div>
          </div>

          {/* Frequently Asked Questions */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-indigo-400" /> Client FAQs
            </h3>

            <div className="space-y-3">
              {FAQS.map((faq, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-surface-card/60 border border-surface-border space-y-1.5"
                >
                  <h4 className="text-sm font-bold text-white">{faq.q}</h4>
                  <p className="text-xs text-white/60 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
