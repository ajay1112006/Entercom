'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { PillNav } from './PillNav';
import { Button } from './ui/Button';

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'Team', href: '/team' },
  { label: 'Contact', href: '/contact' },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between relative">
        {/* Left Corner: Entercom Title */}
        <Link
          href="/"
          className="flex items-center group hover:opacity-90 transition-opacity"
        >
          <span className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display leading-none flex items-center">
            <span className="text-white">Enter</span>
            <span className="text-indigo-400 group-hover:text-indigo-300 transition-colors">com</span>
          </span>
        </Link>

        {/* Center: PillNav Navigation Links */}
        <div className="hidden md:block absolute left-1/2 -translate-x-1/2">
          <PillNav
            showLogo={false}
            items={NAV_ITEMS}
            activeHref={pathname}
            className={`transition-all duration-500 ${
              scrolled ? 'opacity-95 scale-[0.98]' : 'opacity-100 scale-100'
            }`}
            baseColor="rgba(10, 10, 15, 0.7)"
            pillColor="rgba(255, 255, 255, 0.08)"
            pillTextColor="#ffffff"
            hoveredPillTextColor="#ffffff"
            initialLoadAnimation={true}
          />
        </div>

        {/* Right Corner: CTA Button */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/contact">
            <Button
              variant="glow"
              size="sm"
              className="text-xs font-mono font-semibold"
              icon={<ArrowUpRight className="w-3.5 h-3.5" />}
            >
              Start a Project
            </Button>
          </Link>
        </div>

        {/* Mobile Navigation Trigger */}
        <div className="md:hidden">
          <PillNav
            showLogo={false}
            items={NAV_ITEMS}
            activeHref={pathname}
            baseColor="rgba(10, 10, 15, 0.7)"
            pillColor="rgba(255, 255, 255, 0.08)"
            pillTextColor="#ffffff"
            hoveredPillTextColor="#ffffff"
          />
        </div>
      </div>
    </header>
  );
}
