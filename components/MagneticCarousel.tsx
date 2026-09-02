import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Github, Twitter, Linkedin, Dribbble, X } from 'lucide-react';
import { TeamMember } from '@/types';
import { Badge } from './ui/Badge';
import { BorderGlow } from './BorderGlow';

const EASE_PRESETS: Record<string, string> = {
  linear: 'linear',
  easeIn: 'ease-in',
  easeOut: 'ease-out',
  easeInOut: 'ease-in-out',
};

function parseTransition(t: any) {
  const dur = Math.max(0.05, (t && t.duration) || 0.5);
  let ease = 'cubic-bezier(0.44, 0, 0.56, 1)';
  if (t && Array.isArray(t.ease) && t.ease.length === 4) {
    ease = `cubic-bezier(${t.ease.join(', ')})`;
  } else if (t && typeof t.ease === 'string' && EASE_PRESETS[t.ease]) {
    ease = EASE_PRESETS[t.ease];
  } else if (t && t.type === 'spring') {
    ease = 'cubic-bezier(0.34, 1.56, 0.64, 1)';
  }
  return { dur, ease };
}

export interface MagneticCarouselProps {
  members?: TeamMember[];
  collapsedWidth?: number;
  hoverWidth?: number;
  collapsedHeight?: number;
  hoverHeight?: number;
  openWidth?: number;
  openHeight?: number;
  gap?: number;
  influence?: number;
  blur?: number;
  transition?: {
    type?: string;
    duration?: number;
    ease?: string;
  };
  style?: React.CSSProperties;
}

export function MagneticCarousel({
  members = [],
  collapsedWidth = 110,
  hoverWidth = 180,
  collapsedHeight = 360,
  hoverHeight = 410,
  openWidth = 520,
  openHeight = 440,
  gap = 16,
  influence = 220,
  blur = 3,
  transition = { type: 'tween', duration: 0.4, ease: 'easeInOut' },
  style = {},
}: MagneticCarouselProps) {
  const items = members;
  const count = items.length;

  const containerRef = useRef<HTMLDivElement>(null);
  const [factors, setFactors] = useState<number[]>(() => items.map(() => 0));
  const [open, setOpen] = useState<number | null>(null);
  const [closing, setClosing] = useState(false);

  const targetRef = useRef<number[]>(items.map(() => 0));
  const curRef = useRef<number[]>(items.map(() => 0));
  const loopRef = useRef(0);
  const closeTimer = useRef<any>(0);

  useEffect(() => {
    targetRef.current = items.map(() => 0);
    curRef.current = items.map(() => 0);
    setFactors(items.map(() => 0));
  }, [count]);

  useEffect(
    () => () => {
      cancelAnimationFrame(loopRef.current);
      clearTimeout(closeTimer.current);
    },
    []
  );

  const startLoop = () => {
    if (loopRef.current) return;
    const step = () => {
      const tgt = targetRef.current;
      const cur = curRef.current;
      let moving = false;
      for (let i = 0; i < cur.length; i++) {
        const d = (tgt[i] ?? 0) - cur[i];
        if (Math.abs(d) > 0.001) {
          cur[i] += d * 0.2;
          moving = true;
        } else {
          cur[i] = tgt[i] ?? 0;
        }
      }
      setFactors([...cur]);
      loopRef.current = moving ? requestAnimationFrame(step) : 0;
    };
    loopRef.current = requestAnimationFrame(step);
  };

  const setTargetFromCursor = (clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = clientX - rect.left;
    const n = items.length;
    const totalBase = n * collapsedWidth + (n - 1) * gap;
    const startX = (rect.width - totalBase) / 2;

    targetRef.current = items.map((_, i) => {
      const center = startX + i * (collapsedWidth + gap) + collapsedWidth / 2;
      const dist = Math.abs(cx - center);
      const f = Math.max(0, 1 - dist / influence);
      return f * f * (3 - 2 * f);
    });
    startLoop();
  };

  const onMove = (e: React.MouseEvent) => {
    if (open !== null) return;
    setTargetFromCursor(e.clientX);
  };

  const onLeave = () => {
    if (open !== null) return;
    targetRef.current = items.map(() => 0);
    startLoop();
  };

  const close = () => {
    targetRef.current = items.map(() => 0);
    curRef.current = items.map(() => 0);
    setFactors(items.map(() => 0));
    setClosing(true);
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setClosing(false), dur * 1000);
    setOpen(null);
  };

  const sizeFor = (i: number) => {
    if (open !== null) {
      return i === open
        ? { width: openWidth, height: openHeight }
        : { width: collapsedWidth, height: collapsedHeight };
    }
    const f = factors[i] ?? 0;
    return {
      width: collapsedWidth + (hoverWidth - collapsedWidth) * f,
      height: collapsedHeight + (hoverHeight - collapsedHeight) * f,
    };
  };

  const { dur, ease } = parseTransition(transition);
  const openEase = `width ${dur}s ${ease}, height ${dur}s ${ease}, filter ${dur}s ${ease}, opacity ${dur}s ${ease}`;
  const barTransition = open !== null || closing ? openEase : 'none';

  return (
    <div
      ref={containerRef}
      style={{
        ...style,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap,
        position: 'relative',
        overflow: 'visible',
      }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="py-8"
    >
      {/* Backdrop */}
      <div
        style={{
          position: 'absolute',
          inset: -20,
          zIndex: 1,
          pointerEvents: open !== null ? 'auto' : 'none',
        }}
        onClick={close}
      />

      {items.map((member, i) => {
        const { width, height } = sizeFor(i);
        const blurred = open !== null && i !== open;
        const isOpen = open === i;

        return (
          <div
            key={member.id}
            onClick={(e) => {
              e.stopPropagation();
              if (isOpen) close();
              else setOpen(i);
            }}
            style={{
              flex: 'none',
              width,
              height,
              overflow: 'hidden',
              cursor: 'pointer',
              transition: barTransition,
              willChange: 'width, height',
              position: 'relative',
              zIndex: isOpen ? 10 : 2,
              filter: blurred ? `blur(${blur}px)` : 'none',
              opacity: blurred ? 0.45 : 1,
              borderRadius: 24,
              backgroundColor: '#0d0b1a',
              border: 'none',
              boxShadow: isOpen
                ? '0 25px 50px -12px rgba(99, 102, 241, 0.35), 0 0 30px rgba(0,0,0,0.8)'
                : '0 15px 30px rgba(0,0,0,0.5)',
            }}
            className="group transition-colors duration-300"
          >
            {/* Collapsed Bar View */}
            {!isOpen && (
              <div className="relative w-full h-full flex flex-col justify-between p-3 select-none">
                <Image
                  src={member.imageUrl}
                  alt={member.name}
                  fill
                  unoptimized
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0916] via-[#0b0916]/30 to-transparent" />

                {/* Top Role Badge */}
                <div className="relative z-10">
                  <span className="inline-block text-[9px] font-mono text-indigo-300 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full truncate max-w-full">
                    {member.role.split('&')[0]}
                  </span>
                </div>

                {/* Bottom Name & Role Label */}
                <div className="relative z-10 space-y-0.5">
                  <h4 className="text-sm sm:text-base font-bold text-white leading-tight truncate">
                    {member.name}
                  </h4>
                  <p className="text-[10px] font-mono text-white/60 truncate">{member.role}</p>
                </div>
              </div>
            )}

            {/* Expanded Full Card View */}
            {isOpen && (
              <div className="relative w-full h-full p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-center bg-[#0d0a1d] text-left select-text">
                {/* Close X Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    close();
                  }}
                  className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-white/80 hover:text-white hover:bg-black/90 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Left Avatar Image */}
                <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden shrink-0 shadow-2xl">
                  <Image
                    src={member.imageUrl}
                    alt={member.name}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>

                {/* Right Details Content */}
                <div className="flex-1 space-y-3 overflow-y-auto max-h-full pr-1">
                  <div className="space-y-1">
                    <Badge variant="purple" size="sm">
                      {member.role}
                    </Badge>
                    <h3 className="text-2xl font-bold text-white tracking-tight">{member.name}</h3>
                  </div>

                  <p className="text-white/70 text-xs sm:text-sm leading-relaxed">{member.bio}</p>

                  {/* Skill Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {member.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-[10px] font-mono text-indigo-300 bg-indigo-500/10 px-2.5 py-0.5 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Social Links */}
                  <div className="flex items-center gap-2 pt-2">
                    {member.social.github && (
                      <a
                        href={member.social.github}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {member.social.twitter && (
                      <a
                        href={member.social.twitter}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                      >
                        <Twitter className="w-4 h-4" />
                      </a>
                    )}
                    {member.social.linkedin && (
                      <a
                        href={member.social.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                    )}
                    {member.social.dribbble && (
                      <a
                        href={member.social.dribbble}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                      >
                        <Dribbble className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default MagneticCarousel;
