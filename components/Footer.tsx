'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github, Twitter, Linkedin, Check, Send } from 'lucide-react';
import { Button } from './ui/Button';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    setError('');
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <footer className="relative bg-surface border-t border-surface-border pt-16 pb-12 overflow-hidden">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-16 border-b border-surface-border">
          
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <img src="/logo.png" alt="Entercom Logo" className="w-8 h-8 rounded-full object-cover border border-white/10" />
              <span className="text-xl font-bold tracking-tight text-white font-display">Entercom</span>
            </Link>
            <p className="text-white/60 text-sm max-w-sm leading-relaxed">
              We design and build bespoke, high-performance websites for visionary companies. Engineered for speed, conversion, and visual delight.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="w-9 h-9 rounded-full bg-surface-card border border-surface-border flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
                className="w-9 h-9 rounded-full bg-surface-card border border-surface-border flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-full bg-surface-card border border-surface-border flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white/40">Navigation</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="text-white/70 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-white/70 hover:text-white transition-colors">
                  Projects Showcase
                </Link>
              </li>
              <li>
                <Link href="/team" className="text-white/70 hover:text-white transition-colors">
                  Team & Culture
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/70 hover:text-white transition-colors">
                  Start a Project
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white/40">Services</h4>
            <ul className="space-y-2.5 text-sm">
              <li className="text-white/70">Next.js Development</li>
              <li className="text-white/70">Motion & Interactive Web</li>
              <li className="text-white/70">Headless Commerce</li>
              <li className="text-white/70">Design Systems</li>
              <li className="text-white/70">Speed & SEO Audits</li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white/40">Insights & Drops</h4>
            <p className="text-white/60 text-xs leading-relaxed">
              Get our monthly breakdown of web performance trends and UI design drops.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative flex items-center">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full bg-surface-card border border-surface-border text-white text-xs rounded-full pl-3.5 pr-10 py-2.5 focus:outline-none focus:border-indigo-500/60 placeholder:text-white/30"
                />
                <button
                  type="submit"
                  aria-label="Subscribe to newsletter"
                  className="absolute right-1 w-7 h-7 rounded-full bg-white text-black flex items-center justify-center hover:bg-neutral-200 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              {error && <p className="text-[11px] text-red-400">{error}</p>}
              {subscribed && (
                <p className="text-[11px] text-emerald-400 flex items-center gap-1">
                  <Check className="w-3 h-3" /> Subscribed successfully!
                </p>
              )}
            </form>
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/40 gap-4">
          <p>© {new Date().getFullYear()} Entercom Agency. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Built with Next.js App Router & Framer Motion</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" title="System Operational" />
          </div>
        </div>
      </div>
    </footer>
  );
}
