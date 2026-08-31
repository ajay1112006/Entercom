'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';

import './ScrollExpand.css';

const clamp = (v: number, a: number, b: number): number => (v < a ? a : v > b ? b : v);

const smoothstep = (edge0: number, edge1: number, x: number): number => {
  const t = clamp((x - edge0) / (edge1 - edge0 || 1e-6), 0, 1);
  return t * t * (3 - 2 * t);
};

export interface ProjectSlideData {
  id: string;
  title: string;
  category: string;
  client: string;
  description: string;
  impact?: string;
  metrics?: { label: string; value: string }[];
  imageUrl: string;
  link?: string;
  rawProject?: any;
}

type ConfigKey =
  | 'startWidth'
  | 'startHeight'
  | 'startRadius'
  | 'endRadius'
  | 'mediaZoom'
  | 'scrollDistance'
  | 'holdDistance'
  | 'smoothing'
  | 'overlayScrim'
  | 'useWindowScroll'
  | 'enabled';

export interface ScrollExpandProps {
  src?: string;
  mediaType?: 'image' | 'video';
  poster?: string;
  alt?: string;
  title?: string;
  scrollHint?: string;
  startWidth?: number;
  startHeight?: number;
  startRadius?: number;
  endRadius?: number;
  mediaZoom?: number;
  scrollDistance?: number;
  holdDistance?: number;
  smoothing?: number;
  overlayScrim?: number;
  useWindowScroll?: boolean;
  enabled?: boolean;
  projects?: ProjectSlideData[];
  onProjectClick?: (project: any) => void;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  [key: string]: unknown;
}

const ScrollExpand: React.FC<ScrollExpandProps> = ({
  src = '',
  mediaType = 'image',
  poster = '',
  alt = '',
  title = '',
  scrollHint = '',
  startWidth = 44,
  startHeight = 58,
  startRadius = 24,
  endRadius = 0,
  mediaZoom = 1.35,
  scrollDistance = 1.0,
  holdDistance = 4.0,
  smoothing = 0.1,
  overlayScrim = 0.85,
  useWindowScroll = true,
  enabled = true,
  projects,
  onProjectClick,
  children,
  className = '',
  style,
  ...rest
}: ScrollExpandProps) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const mediaRef = useRef<HTMLImageElement & HTMLVideoElement>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const scrimRef = useRef<HTMLDivElement | null>(null);
  const hintRef = useRef<HTMLDivElement | null>(null);

  const slideLayerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const slideImgRefs = useRef<(HTMLImageElement | null)[]>([]);

  const [activeProjectIndexState, setActiveProjectIndexState] = useState(0);

  const propsRef = useRef<Required<Pick<ScrollExpandProps, ConfigKey>>>(
    {} as Required<Pick<ScrollExpandProps, ConfigKey>>
  );
  propsRef.current = {
    startWidth,
    startHeight,
    startRadius,
    endRadius,
    mediaZoom,
    scrollDistance,
    holdDistance,
    smoothing,
    overlayScrim,
    useWindowScroll,
    enabled
  };

  const projectCount = projects?.length || 0;

  const applyProgress = useCallback(
    (p: number) => {
      const frame = frameRef.current;
      const media = mediaRef.current;
      if (!frame) return;
      const c = propsRef.current;

      // 3-Phase Scroll Arc:
      // Phase 1: Entry Expansion (0.0 -> 0.18)
      // Phase 2: Project Slides Showcase (0.18 -> 0.82)
      // Phase 3: Exit Shrink Back (0.82 -> 1.0)
      const expandEnd = 0.18;
      const collapseStart = 0.82;

      let scaleFactor = 0; // 0 = resting original size, 1 = 100% full screen

      if (p <= expandEnd) {
        const rawP = clamp(p / expandEnd, 0, 1);
        scaleFactor = smoothstep(0, 1, rawP);
      } else if (p >= collapseStart) {
        const rawP = clamp((p - collapseStart) / (1 - collapseStart), 0, 1);
        scaleFactor = 1 - smoothstep(0, 1, rawP);
      } else {
        scaleFactor = 1;
      }

      // Clip Path inset calculation based on scaleFactor
      const w = c.startWidth + (100 - c.startWidth) * scaleFactor;
      const h = c.startHeight + (100 - c.startHeight) * scaleFactor;
      const ix = Math.max(0, (100 - w) / 2);
      const iy = Math.max(0, (100 - h) / 2);
      const r = c.startRadius + (c.endRadius - c.startRadius) * scaleFactor;
      frame.style.clipPath = `inset(${iy.toFixed(2)}% ${ix.toFixed(2)}% ${iy.toFixed(2)}% ${ix.toFixed(2)}% round ${r.toFixed(1)}px)`;

      if (media) {
        media.style.transform = `scale(${c.mediaZoom + (1 - c.mediaZoom) * scaleFactor})`;
      }

      if (scrimRef.current) {
        scrimRef.current.style.opacity = `${c.overlayScrim * scaleFactor}`;
      }

      if (titleRef.current) {
        const out = smoothstep(0.2, 0.8, scaleFactor);
        titleRef.current.style.opacity = `${1 - out}`;
        titleRef.current.style.transform = `translate3d(0, ${-30 * out}px, 0) scale(${1 + 0.05 * out})`;
      }

      if (hintRef.current) {
        const gone = smoothstep(0, 0.15, scaleFactor);
        hintRef.current.style.opacity = `${1 - gone}`;
        hintRef.current.style.transform = `translate3d(0, ${10 * gone}px, 0)`;
      }

      if (overlayRef.current) {
        const inn = smoothstep(0.65, 0.98, scaleFactor);
        overlayRef.current.style.opacity = `${inn}`;
        overlayRef.current.style.transform = `translate3d(0, ${18 * (1 - inn)}px, 0)`;
      }

      // Phase 2: Slide Progress (0 to 1 across the middle hold window)
      const rawSlideP = clamp((p - expandEnd) / Math.max(0.01, collapseStart - expandEnd), 0, 1);

      if (projectCount > 0) {
        const activeFloatIndex = rawSlideP * (projectCount - 1);
        const activeIdx = Math.min(Math.floor(activeFloatIndex + 0.5), projectCount - 1);

        setActiveProjectIndexState((prev) => (prev !== activeIdx ? activeIdx : prev));

        // Direct 60fps DOM updates for overlapping card layers
        for (let idx = 0; idx < projectCount; idx++) {
          const layerEl = slideLayerRefs.current[idx];
          if (!layerEl) continue;

          let entryP = 1;
          if (idx > 0) {
            entryP = clamp(activeFloatIndex - (idx - 1), 0, 1);
          }
          const smoothEntryP = smoothstep(0, 1, entryP);

          let coverP = 0;
          if (activeFloatIndex > idx) {
            coverP = clamp(activeFloatIndex - idx, 0, 1);
          }
          const smoothCoverP = smoothstep(0, 1, coverP);

          const translateY = idx === 0 ? 0 : (1 - smoothEntryP) * 100;
          const scale = 1 - 0.05 * smoothCoverP;
          const brightness = 1 - 0.45 * smoothCoverP;
          const blurVal = smoothCoverP * 4;

          layerEl.style.transform = `translate3d(0, ${translateY.toFixed(2)}%, 0) scale(${scale.toFixed(3)})`;
          layerEl.style.filter = `brightness(${brightness.toFixed(3)}) blur(${blurVal.toFixed(1)}px)`;

          const imgEl = slideImgRefs.current[idx];
          if (imgEl) {
            const imgScale = 1.08 - 0.08 * smoothEntryP;
            imgEl.style.transform = `scale(${imgScale.toFixed(3)})`;
          }
        }
      }
    },
    [projectCount]
  );

  useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!root || !track || !stage) return;

    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let raf = 0;
    let current = 0;
    let target = 0;
    let stageH = 0;
    let running = false;

    const measure = () => {
      const c = propsRef.current;
      stageH = c.useWindowScroll ? window.innerHeight : root.clientHeight;
      if (stageH <= 0) return;
      stage.style.height = `${stageH}px`;
      const totalMultiples = 1 + Math.max(0, c.scrollDistance) + Math.max(0, c.holdDistance);
      track.style.height = `${stageH * totalMultiples}px`;

      const w = root.clientWidth || stageH;
      stage.style.setProperty('--se-title-size', `${clamp(w * 0.055, 20, 72)}px`);
    };

    const readProgress = () => {
      const c = propsRef.current;
      if (!c.enabled) return 1;
      const totalSpan = stageH * (Math.max(0.01, c.scrollDistance) + Math.max(0, c.holdDistance));
      if (c.useWindowScroll) {
        const top = track.getBoundingClientRect().top;
        const entryOffset = stageH * 0.4;
        const currentScroll = entryOffset - top;
        return clamp(currentScroll / Math.max(1, totalSpan), 0, 1);
      }
      return clamp(root.scrollTop / Math.max(1, totalSpan), 0, 1);
    };

    const tick = () => {
      const c = propsRef.current;
      const k = c.smoothing <= 0 ? 1 : 1 - Math.exp(-1 / (60 * c.smoothing));
      current += (target - current) * k;
      if (Math.abs(target - current) < 0.0004) {
        current = target;
        running = false;
      }
      applyProgress(current);
      raf = running ? requestAnimationFrame(tick) : 0;
    };

    const kick = () => {
      if (running) return;
      running = true;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      target = readProgress();
      if (propsRef.current.smoothing <= 0 || reduceMotion) {
        current = target;
        applyProgress(current);
        return;
      }
      kick();
    };

    const onResize = () => {
      measure();
      target = readProgress();
      current = target;
      applyProgress(current);
    };

    measure();
    target = readProgress();
    current = target;
    applyProgress(current);

    const scroller = useWindowScroll ? window : root;
    scroller.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    const ro = new ResizeObserver(onResize);
    ro.observe(root);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      scroller.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      ro.disconnect();
    };
  }, [applyProgress, useWindowScroll]);

  const baseMedia =
    mediaType === 'video' ? (
      <video
        ref={mediaRef}
        className="scroll-expand__media"
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
      />
    ) : (
      <img
        ref={mediaRef}
        className="scroll-expand__media"
        src={src}
        alt={alt}
        draggable={false}
      />
    );

  return (
    <div
      ref={rootRef}
      className={`scroll-expand ${useWindowScroll ? '' : 'scroll-expand--scroller'} ${className}`.trim()}
      style={style}
      {...rest}
    >
      <div ref={trackRef} className="scroll-expand__track">
        <div ref={stageRef} className="scroll-expand__stage">
          <div ref={frameRef} className="scroll-expand__frame">
            
            {/* 3D Overlapping Card Deck Layers */}
            {projects && projects.length > 0 ? (
              <div className="absolute inset-0 w-full h-full">
                {projects.map((proj, idx) => (
                  <div
                    key={proj.id || idx}
                    ref={(el) => {
                      slideLayerRefs.current[idx] = el;
                    }}
                    className="project-slide-layer"
                    style={{
                      transform: idx === 0 ? 'translate3d(0, 0%, 0) scale(1)' : 'translate3d(0, 100%, 0) scale(1)',
                      zIndex: 10 + idx,
                    }}
                  >
                    {/* Background Image */}
                    <img
                      ref={(el) => {
                        slideImgRefs.current[idx] = el;
                      }}
                      src={proj.imageUrl}
                      alt={proj.title}
                      className="absolute inset-0 w-full h-full object-cover transform-gpu"
                      draggable={false}
                    />

                    {/* Gradient Overlay Scrim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-[#070709]/60 to-[#070709]/75 pointer-events-none" />

                    {/* Slide Content */}
                    <div className="absolute inset-0 w-full max-w-5xl mx-auto h-full flex flex-col justify-between p-6 sm:p-12 text-left z-20">
                      
                      {/* Top Bar */}
                      <div className="flex items-center justify-between gap-4 pt-2">
                        <div className="flex items-center gap-3">
                          <span className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 backdrop-blur-md">
                            {proj.category}
                          </span>
                          <span className="text-xs font-mono text-white/70 hidden sm:inline-block">
                            Client: <strong className="text-white font-semibold">{proj.client}</strong>
                          </span>
                        </div>

                        <div className="flex items-center gap-2 font-mono text-xs text-white/90 bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15">
                          <span className="text-indigo-400 font-bold">0{idx + 1}</span>
                          <span className="text-white/40">/</span>
                          <span>0{projects.length}</span>
                        </div>
                      </div>

                      {/* Middle Content */}
                      <div className="space-y-6 my-auto py-4 max-w-3xl">
                        <div className="space-y-2">
                          <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-bold block">
                            Featured Client Project
                          </span>
                          <h2 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight font-display drop-shadow-2xl leading-none">
                            {proj.title}
                          </h2>
                          <p className="text-white/80 text-base sm:text-lg leading-relaxed font-normal pt-2">
                            {proj.description}
                          </p>
                        </div>

                        {/* Metrics Row */}
                        {proj.metrics && proj.metrics.length > 0 && (
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                            {proj.metrics.map((metric, mIdx) => (
                              <div
                                key={mIdx}
                                className="p-3.5 rounded-2xl bg-black/60 border border-white/15 backdrop-blur-md space-y-1"
                              >
                                <span className="text-[11px] font-mono text-white/50 block uppercase tracking-wider">
                                  {metric.label}
                                </span>
                                <span className="text-lg sm:text-xl font-bold font-mono text-emerald-400">
                                  {metric.value}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Bottom Bar */}
                      <div className="pb-4 pt-4 border-t border-white/15 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                        <button
                          onClick={() => {
                            if (onProjectClick) onProjectClick(proj.rawProject || proj);
                          }}
                          className="inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-full bg-white text-black font-bold text-sm hover:bg-indigo-400 hover:text-white transition-all shadow-2xl group"
                        >
                          <span>Explore Case Study</span>
                          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </button>

                        {/* Active Slide Indicators */}
                        <div className="flex items-center gap-2">
                          {projects.map((_, pIdx) => {
                            const isCurrent = pIdx === activeProjectIndexState;
                            return (
                              <div
                                key={pIdx}
                                className={`h-1.5 rounded-full transition-all duration-300 ${
                                  isCurrent
                                    ? 'w-8 bg-indigo-400'
                                    : 'w-2 bg-white/30'
                                }`}
                              />
                            );
                          })}
                        </div>
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                {baseMedia}
                <div ref={scrimRef} className="scroll-expand__scrim" />
                {children ? (
                  <div ref={overlayRef} className="scroll-expand__overlay">
                    {children}
                  </div>
                ) : null}
              </>
            )}

          </div>

          {title ? (
            <div ref={titleRef} className="scroll-expand__title">
              {title}
            </div>
          ) : null}

          {scrollHint ? (
            <div ref={hintRef} className="scroll-expand__hint">
              {scrollHint}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ScrollExpand;
