'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { Project } from '@/types';
import { Badge } from './ui/Badge';

export interface RoundCarouselItem {
  src: string;
  title: string;
  category: string;
  client: string;
  year?: string;
  tags?: string[];
  rawProject: Project;
}

export interface RoundCarouselProps {
  projects?: Project[];
  onSelectProject?: (project: Project) => void;
  imageWidth?: number;
  imageHeight?: number;
  spacing?: number;
  speed?: number;
  direction?: 'right' | 'left';
  drag?: boolean;
  sensitivity?: number;
  tilt?: number;
  perspective?: number;
  cornerRadius?: number;
  innerDim?: number;
  background?: string;
  style?: React.CSSProperties;
}

export function RoundCarousel({
  projects = [],
  onSelectProject,
  imageWidth = 340,
  imageHeight = 420,
  spacing = 3.5,
  speed = 1.5,
  direction = 'right',
  drag = true,
  sensitivity = 5,
  tilt = -6,
  perspective = 2800,
  cornerRadius = 24,
  innerDim = 3.5,
  background = 'transparent',
  style = {},
}: RoundCarouselProps) {
  // Convert projects to carousel items. If fewer than 6, multiply items to form a rich ring.
  let rawItems: RoundCarouselItem[] = projects.map((p) => ({
    src: p.imageUrl,
    title: p.title,
    category: p.category,
    client: p.client,
    year: p.year,
    tags: p.tags,
    rawProject: p,
  }));

  if (rawItems.length > 0 && rawItems.length < 6) {
    const original = [...rawItems];
    while (rawItems.length < 6) {
      rawItems = [...rawItems, ...original];
    }
  }

  const items = rawItems;
  const count = items.length || 1;

  const ringRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);
  const rotYRef = useRef(0);
  const velRef = useRef(0);
  const lastRef = useRef(0);
  const dragRef = useRef({ active: false, x: 0, startX: 0, startTime: 0, moved: false });
  const [isDragging, setIsDragging] = useState(false);

  const angle = 360 / count;
  const factor = 1 + spacing * 0.15;
  const radius = (imageWidth * factor) / (2 * Math.tan(Math.PI / count));
  const radiusPx = cornerRadius;
  const degPerSec = speed * 6 * (direction === 'left' ? -1 : 1);

  useEffect(() => {
    const ring = ringRef.current;
    if (!ring) return;
    const apply = () =>
      (ring.style.transform = `translateZ(${-radius}px) rotateY(${rotYRef.current}deg)`);
    apply();

    const draw = (now: number) => {
      const dt = lastRef.current ? (now - lastRef.current) / 1000 : 0;
      lastRef.current = now;
      const f = Math.min(dt, 0.1);
      const d = dragRef.current;
      if (!d.active) {
        if (Math.abs(velRef.current) > 0.01) {
          rotYRef.current += velRef.current * f;
          velRef.current *= 0.94;
        } else {
          rotYRef.current += degPerSec * f;
        }
      }
      apply();
      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [radius, degPerSec, count]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (!drag) return;
    dragRef.current = { active: true, x: e.clientX, startX: e.clientX, startTime: Date.now(), moved: false };
    velRef.current = 0;
    setIsDragging(true);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const d = dragRef.current;
    if (!d.active) return;
    const dx = e.clientX - d.x;
    if (Math.abs(e.clientX - d.startX) > 10) {
      d.moved = true;
    }
    d.x = e.clientX;
    const k = 0.3 * sensitivity;
    rotYRef.current += dx * k;
    velRef.current = dx * k * 60;
  };

  const onPointerUp = () => {
    dragRef.current.active = false;
    setIsDragging(false);
  };

  const handleCardClick = (item: RoundCarouselItem, e: React.MouseEvent) => {
    const d = dragRef.current;
    const elapsed = Date.now() - (d.startTime || 0);
    if (d.moved && Math.abs(d.x - d.startX) > 12 && elapsed > 250) {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    if (onSelectProject) {
      onSelectProject(item.rawProject);
    }
  };

  const faceBase: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    borderRadius: radiusPx,
    overflow: 'hidden',
    backfaceVisibility: 'hidden',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div
      style={{
        ...style,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background,
        perspective: `${perspective}px`,
        cursor: isDragging ? 'grabbing' : drag ? 'grab' : 'default',
        touchAction: 'none',
        userSelect: 'none',
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <div
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateX(${tilt}deg)`,
        }}
      >
        <div
          ref={ringRef}
          style={{
            position: 'relative',
            width: imageWidth,
            height: imageHeight,
            transformStyle: 'preserve-3d',
          }}
        >
          {items.map((item, i) => {
            const src = item.src;
            return (
              <div
                key={i}
                onClick={(e) => handleCardClick(item, e)}
                style={{
                  position: 'absolute',
                  inset: 0,
                  transform: `rotateY(${i * angle}deg) translateZ(${radius}px)`,
                  transformStyle: 'preserve-3d',
                }}
                className="group cursor-pointer"
              >
                {/* Front Face - Detailed Project Card */}
                <div
                  style={{
                    ...faceBase,
                    backgroundColor: '#0c0a18',
                    border: 'none',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
                  }}
                  className="flex flex-col justify-between transition-all duration-300"
                >
                  {/* Top Image Portion */}
                  <div className="relative w-full h-[58%] overflow-hidden bg-neutral-900">
                    {src && (
                      <Image
                        src={src}
                        alt={item.title}
                        fill
                        unoptimized
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a18] via-transparent to-transparent opacity-90" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
                      <Badge variant="purple" size="sm">
                        {item.category}
                      </Badge>
                      {item.year && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono text-white/90 bg-black/70 backdrop-blur-md">
                          {item.year}
                        </span>
                      )}
                    </div>

                    {/* Hover Button Pill */}
                    <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                      <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center shadow-lg transform translate-y-1 group-hover:translate-y-0 transition-transform">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Bottom Content Body */}
                  <div className="p-5 flex flex-col justify-between flex-1 space-y-3 bg-[#0c0a18]">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors leading-tight">
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-xs font-mono text-white/50">{item.client}</p>
                    </div>

                    {item.tags && item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {item.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] font-mono text-white/60 bg-white/5 px-2 py-0.5 rounded-md"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Back Face */}
                <div
                  style={{
                    ...faceBase,
                    transform: 'rotateY(180deg)',
                    backgroundColor: src ? 'transparent' : '#181818',
                    backgroundImage: src ? `url(${src})` : undefined,
                    filter: `brightness(${innerDim / 10})`,
                    border: 'none',
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default RoundCarousel;
