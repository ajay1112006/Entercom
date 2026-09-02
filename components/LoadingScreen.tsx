'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Volume2, VolumeX } from 'lucide-react';
import './LoadingScreen.css';

interface LoadingScreenProps {
  onComplete?: () => void;
  playbackSpeed?: number; // 1.4x playback speed for snappy intro animation
}

export function LoadingScreen({ onComplete, playbackSpeed = 1.4 }: LoadingScreenProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isOutro, setIsOutro] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  // Lock body scroll and set accelerated video playback speed
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    if (videoRef.current) {
      videoRef.current.playbackRate = playbackSpeed;
      videoRef.current.play().catch((err) => {
        console.warn('Autoplay prevented by browser:', err);
      });
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [playbackSpeed]);

  const handleVideoEnd = () => {
    triggerOutro();
  };

  const triggerOutro = () => {
    setIsOutro(true);
    setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = '';
      if (onComplete) onComplete();
    }, 850);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-auto select-none overflow-hidden font-sans bg-[#ebf0ec]">
      <AnimatePresence>
        {!isOutro && (
          <motion.div
            key="fullscreen-load-video-screen"
            initial={{ opacity: 1 }}
            exit={{
              scale: 1.08,
              opacity: 0,
              filter: 'blur(8px)',
              transition: { duration: 0.6, ease: [0.7, 0, 0.3, 1] },
            }}
            className="absolute inset-0 w-full h-full flex flex-col justify-between overflow-hidden bg-[#ebf0ec]"
          >
            {/* FULLSCREEN LOAD.MP4 VIDEO (Edge to edge fit) */}
            <video
              ref={videoRef}
              src="/load.mp4"
              autoPlay
              muted={isMuted}
              playsInline
              onEnded={handleVideoEnd}
              className="absolute inset-0 w-full h-full object-cover z-0"
            />

            {/* Minimal Top Controls Bar */}
            <div className="relative z-20 p-6 flex items-center justify-end gap-3 pointer-events-none">
              {/* Mute/Unmute */}
              <button
                onClick={toggleMute}
                className="pointer-events-auto flex items-center gap-1.5 text-xs font-mono text-zinc-700 bg-white/80 hover:bg-white backdrop-blur-md px-3.5 py-2 rounded-full border border-zinc-200/80 shadow-md transition-all hover:scale-105"
                title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-zinc-500" /> : <Volume2 className="w-4 h-4 text-indigo-600" />}
                <span className="hidden sm:inline">{isMuted ? 'MUTED' : 'AUDIO ON'}</span>
              </button>

              {/* Skip Intro */}
              <button
                onClick={triggerOutro}
                className="pointer-events-auto flex items-center gap-1.5 text-xs font-mono font-bold text-indigo-600 hover:text-indigo-700 bg-white/95 hover:bg-white backdrop-blur-md px-4 py-2 rounded-full border border-indigo-200 shadow-md transition-all hover:scale-105"
              >
                <span>SKIP</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* OUTRO: DUAL SPLIT CURTAIN REVEAL */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isOutro && (
          <>
            {/* Top Split Panel */}
            <motion.div
              key="video-outro-top-panel"
              initial={{ y: 0 }}
              animate={{ y: '-100%' }}
              transition={{
                duration: 0.85,
                ease: [0.87, 0, 0.13, 1],
              }}
              className="absolute top-0 left-0 right-0 h-1/2 bg-[#ebf0ec] z-[9999] shadow-2xl flex flex-col justify-end"
            >
              <div className="w-full h-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 shadow-[0_4px_25px_rgba(79,70,229,0.6)]" />
            </motion.div>

            {/* Bottom Split Panel */}
            <motion.div
              key="video-outro-bottom-panel"
              initial={{ y: 0 }}
              animate={{ y: '100%' }}
              transition={{
                duration: 0.85,
                ease: [0.87, 0, 0.13, 1],
              }}
              className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#ebf0ec] z-[9999] shadow-2xl flex flex-col justify-start"
            >
              <div className="w-full h-2 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 shadow-[0_-4px_25px_rgba(79,70,229,0.6)]" />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
