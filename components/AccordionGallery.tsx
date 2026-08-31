'use client';

import { useRef, useEffect, useState, useCallback, CSSProperties, KeyboardEvent, MouseEvent } from 'react';
import { gsap } from 'gsap';
import { CheckCircle, ArrowRight, Code2, Sparkles, ShoppingBag, Palette, Zap } from 'lucide-react';
import Link from 'next/link';

import './AccordionGallery.css';

export interface AccordionGalleryItem {
  id?: string;
  image: string;
  label?: string;
  subtitle?: string;
  description?: string;
  badge?: string;
  deliverables?: string[];
  iconName?: 'Code2' | 'Sparkles' | 'ShoppingBag' | 'Palette' | 'Zap';
  link?: string;
  alt?: string;
}

export interface AccordionGalleryProps {
  items?: AccordionGalleryItem[];
  defaultIndex?: number;
  accentColor?: string;
  overlayColor?: string;
  textColor?: string;
  height?: number;
  gap?: number;
  radius?: number;
  expandRatio?: number;
  orientation?: 'horizontal' | 'vertical';
  duration?: number;
  ease?: string;
  parallax?: number;
  tilt?: number;
  stagger?: number;
  trigger?: 'hover' | 'click';
  showLabels?: boolean;
  grayscale?: boolean;
  className?: string;
  onSelect?: (index: number) => void;
}

const DEFAULT_ITEMS: AccordionGalleryItem[] = [
  { image: 'https://picsum.photos/id/1015/900/1200', label: 'Canyon', link: '#' },
  { image: 'https://picsum.photos/id/1018/900/1200', label: 'Ridgeline', link: '#' },
  { image: 'https://picsum.photos/id/1039/900/1200', label: 'Falls', link: '#' },
  { image: 'https://picsum.photos/id/1043/900/1200', label: 'Harbour', link: '#' },
  { image: 'https://picsum.photos/id/1044/900/1200', label: 'Skyline', link: '#' }
];

const renderIcon = (name?: string) => {
  switch (name) {
    case 'Code2':
      return <Code2 className="w-5 h-5 text-indigo-400" />;
    case 'Sparkles':
      return <Sparkles className="w-5 h-5 text-amber-400" />;
    case 'ShoppingBag':
      return <ShoppingBag className="w-5 h-5 text-purple-400" />;
    case 'Palette':
      return <Palette className="w-5 h-5 text-emerald-400" />;
    case 'Zap':
      return <Zap className="w-5 h-5 text-amber-400" />;
    default:
      return <Code2 className="w-5 h-5 text-indigo-400" />;
  }
};

const AccordionGallery = ({
  items = DEFAULT_ITEMS,
  defaultIndex = 0,
  accentColor = '#6366f1',
  overlayColor = '#070709',
  textColor = '#ffffff',
  height = 500,
  gap = 12,
  radius = 20,
  expandRatio = 0.58,
  orientation = 'horizontal',
  duration = 0.6,
  ease = 'power3.out',
  parallax = 0.5,
  tilt = 8,
  stagger = 0.06,
  trigger = 'hover',
  showLabels = true,
  grayscale = true,
  className = '',
  onSelect
}: AccordionGalleryProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLElement | null)[]>([]);
  const mediaRefs = useRef<(HTMLElement | null)[]>([]);
  const barRefs = useRef<(HTMLElement | null)[]>([]);
  const textRefs = useRef<(HTMLElement | null)[]>([]);
  const contentRefs = useRef<(HTMLElement | null)[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const firstRunRef = useRef(true);
  const mediaSizeRef = useRef(320);

  const vertical = orientation === 'vertical';
  const count = items.length;
  const [active, setActive] = useState(Math.min(Math.max(defaultIndex, 0), count - 1));

  const prefersReduced =
    typeof window !== 'undefined' && window.matchMedia
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  const applyLayout = useCallback(
    (animate: boolean) => {
      const panels = panelRefs.current;
      if (!panels.length) return;

      const r = Math.min(Math.max(expandRatio, 0.2), 0.9);
      const grow = count > 1 ? (r * (count - 1)) / (1 - r) : 1;
      const mediaSize = mediaSizeRef.current;

      tlRef.current?.kill();
      const dur = animate && !prefersReduced ? duration : 0;
      const tl = gsap.timeline();

      panels.forEach((panel, i) => {
        if (!panel) return;
        const isActive = i === active;
        const media = mediaRefs.current[i];
        const bar = barRefs.current[i];
        const text = textRefs.current[i];
        const content = contentRefs.current[i];

        const rot = isActive ? 0 : i < active ? tilt : -tilt;
        const rotProp = vertical ? { rotateX: -rot } : { rotateY: rot };

        tl.to(panel, { flexGrow: isActive ? grow : 1, ...rotProp, duration: dur, ease }, 0);

        if (media) {
          const drift = Math.max(-1.5, Math.min(1.5, active - i));
          const shift = drift * parallax * mediaSize * 0.06;
          const gray = grayscale ? (isActive ? 0 : 0.8) : 0;
          tl.to(
            media,
            {
              xPercent: -50,
              yPercent: -50,
              x: vertical ? 0 : isActive ? 0 : shift,
              y: vertical ? (isActive ? 0 : shift) : 0,
              '--ag-gray': gray,
              '--ag-dim': isActive ? 0.75 : 0.45,
              duration: dur,
              ease
            },
            0
          );
        }

        if (showLabels && bar && text) {
          if (isActive) {
            tl.to([bar, text], { opacity: 0, x: -14, duration: dur * 0.35, ease }, 0);
          } else {
            tl.to([bar, text], { opacity: 1, x: 0, duration: dur, ease, stagger: prefersReduced ? 0 : stagger }, 0);
          }
        }

        if (content) {
          if (isActive) {
            // Text appears AFTER the image expands completely (tiny time delay: 72% through expansion)
            const textStartTime = dur * 0.72;

            tl.to(content, { opacity: 1, y: 0, scale: 1, duration: 0.38, ease: 'power3.out' }, textStartTime);

            const children = content.children;
            if (children && children.length > 0 && !prefersReduced) {
              tl.fromTo(
                children,
                { opacity: 0, y: 14 },
                { opacity: 1, y: 0, duration: 0.32, stagger: 0.035, ease: 'power2.out' },
                textStartTime
              );
            }
          } else {
            // Text fades out immediately when mouse leaves / image starts contracting
            tl.to(content, { opacity: 0, y: 12, scale: 0.97, duration: 0.22, ease: 'power2.in' }, 0);
          }
        }
      });

      tlRef.current = tl;
    },
    [
      active,
      count,
      expandRatio,
      duration,
      ease,
      vertical,
      tilt,
      parallax,
      grayscale,
      showLabels,
      stagger,
      prefersReduced
    ]
  );

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const measure = () => {
      const rect = el.getBoundingClientRect();
      const total = vertical ? rect.height : rect.width;
      const usable = Math.max(total - gap * (count - 1), 120);
      const size = Math.max(140, usable * Math.min(Math.max(expandRatio, 0.2), 0.9) * 1.22);
      mediaSizeRef.current = size;
      el.style.setProperty('--ag-media-size', `${size}px`);
      applyLayout(!firstRunRef.current);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [applyLayout, gap, count, expandRatio, vertical]);

  useEffect(() => {
    applyLayout(!firstRunRef.current);
    firstRunRef.current = false;
  }, [applyLayout]);

  useEffect(
    () => () => {
      tlRef.current?.kill();
    },
    []
  );

  const handleEnter = (i: number) => {
    if (trigger === 'hover') {
      setActive(i);
      if (onSelect) onSelect(i);
    }
  };

  const handleClick = (i: number, e: MouseEvent) => {
    if (i !== active) {
      e.preventDefault();
      setActive(i);
      if (onSelect) onSelect(i);
    }
  };

  const handleKeyDown = (i: number, e: KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (i + 1) % count;
      setActive(nextIndex);
      if (onSelect) onSelect(nextIndex);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = (i - 1 + count) % count;
      setActive(prevIndex);
      if (onSelect) onSelect(prevIndex);
    }
  };

  const rootStyle = {
    '--ag-accent': accentColor,
    '--ag-overlay': overlayColor,
    '--ag-text': textColor,
    '--ag-gap': `${gap}px`,
    '--ag-radius': `${radius}px`,
    height: vertical ? `${Math.round(height * 1.6)}px` : `${height}px`
  } as CSSProperties;

  return (
    <div
      ref={rootRef}
      className={`accordion-gallery${vertical ? ' accordion-gallery--vertical' : ''}${className ? ` ${className}` : ''}`}
      style={rootStyle}
      role="list"
      aria-label="Services Accordion Gallery"
    >
      {items.map((item, i) => {
        const isActive = i === active;

        return (
          <div
            key={item.id || i}
            ref={(el: HTMLElement | null) => {
              panelRefs.current[i] = el;
            }}
            className={`ag-panel${isActive ? ' ag-panel--active' : ''}`}
            style={{ borderRadius: `${radius}px` }}
            onClick={e => handleClick(i, e)}
            onMouseEnter={() => handleEnter(i)}
            onFocus={() => {
              setActive(i);
              if (onSelect) onSelect(i);
            }}
            onKeyDown={e => handleKeyDown(i, e)}
            role="listitem"
            tabIndex={0}
            aria-current={isActive ? 'true' : undefined}
            aria-label={item.label}
          >
            {/* Background Image Frame */}
            <span className="ag-panel__frame">
              <span
                className="ag-panel__media"
                ref={(el: HTMLElement | null) => {
                  mediaRefs.current[i] = el;
                }}
              >
                <img src={item.image} alt={item.alt || item.label || ''} draggable={false} />
              </span>
              <span className="ag-panel__overlay" aria-hidden="true" />
            </span>

            {/* Collapsed Panel Label (Visible when NOT active) */}
            {showLabels && (
              <span className="ag-panel__label" aria-hidden="true">
                <span
                  className="ag-panel__bar"
                  ref={(el: HTMLElement | null) => {
                    barRefs.current[i] = el;
                  }}
                />
                <span
                  className="ag-panel__text flex flex-col"
                  ref={(el: HTMLElement | null) => {
                    textRefs.current[i] = el;
                  }}
                >
                  <span className="font-bold text-white text-base sm:text-lg">{item.label}</span>
                  {item.subtitle && (
                    <span className="text-xs text-white/70 font-normal mt-0.5">{item.subtitle}</span>
                  )}
                </span>
              </span>
            )}

            {/* Expanded Panel Rich Content Overlay (Reveals after image expansion completes) */}
            <div
              ref={(el: HTMLElement | null) => {
                contentRefs.current[i] = el;
              }}
              className="ag-panel__content absolute inset-0 p-6 sm:p-8 flex flex-col justify-between z-10 opacity-0 pointer-events-none"
              style={{ pointerEvents: isActive ? 'auto' : 'none' }}
            >
              {/* Header: Badge & Icon */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2.5 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
                  {renderIcon(item.iconName)}
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                    {item.badge || 'Service Overview'}
                  </span>
                </div>
                <span className="text-xs font-mono text-indigo-400 font-bold bg-indigo-500/10 px-2.5 py-1 rounded border border-indigo-500/20">
                  0{i + 1} / 0{count}
                </span>
              </div>

              {/* Middle: Title, Subtitle, Description & Deliverables */}
              <div className="space-y-4 max-w-2xl my-auto py-2">
                <div className="space-y-1">
                  <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-semibold block">
                    {item.subtitle}
                  </span>
                  <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                    {item.label}
                  </h3>
                </div>

                {item.description && (
                  <p className="text-white/80 text-xs sm:text-sm leading-relaxed max-w-xl">
                    {item.description}
                  </p>
                )}

                {item.deliverables && item.deliverables.length > 0 && (
                  <div className="pt-1">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-white/50 block mb-2 font-bold">
                      Key Deliverables & Stack:
                    </span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-white/90">
                      {item.deliverables.map((deliv, dIdx) => (
                        <li key={dIdx} className="flex items-center gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span className="truncate">{deliv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Bottom Footer Action CTA */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-white/60 font-mono">
                  Ready to engineer your website?
                </span>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black font-semibold text-xs hover:bg-indigo-400 hover:text-white transition-all shadow-lg"
                >
                  <span>Start Project Inquiry</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AccordionGallery;
