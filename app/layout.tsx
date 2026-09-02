import type { Metadata } from 'next';
import { Inter_Tight, Space_Grotesk, Space_Mono } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Floating3DBackground } from '@/components/Floating3DBackground';
import { SideRays } from '@/components/SideRays';
import { ScopeCursor } from '@/components/ScopeCursor';
import { LoadingScreen } from '@/components/LoadingScreen';

const interTight = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['500', '600', '700'],
  display: 'swap',
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Entercom — Production-Grade Web Engineering & Motion Studio',
  description: 'Entercom designs and builds high-performance, animation-rich websites for clients. Engineered with Next.js, Framer Motion, and sub-second page loading speed.',
  keywords: ['Next.js Agency', 'Web Design Studio', 'Motion Websites', 'React Engineering', 'Tailwind CSS', 'Vercel Deployment'],
  authors: [{ name: 'Entercom Studio' }],
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: 'Entercom — Bespoke Web Engineering Studio',
    description: 'We build high-converting, motion-driven websites for visionary tech and enterprise brands.',
    url: 'https://entercom.dev',
    siteName: 'Entercom',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Entercom — Web Engineering & Motion Studio',
    description: 'We build high-converting, motion-driven websites for visionary tech and enterprise brands.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${interTight.variable} ${spaceGrotesk.variable} ${spaceMono.variable} dark scroll-smooth`}
    >
      <body className="bg-background text-white min-h-screen flex flex-col antialiased selection:bg-indigo-500 selection:text-white font-sans">
        {/* Intro Entercom Loading Screen */}
        <LoadingScreen />

        {/* Tactical Scope Target Cursor */}
        <ScopeCursor />

        {/* Volumetric WebGL Side Rays Background */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <SideRays
            speed={2.2}
            rayColor1="#6366f1"
            rayColor2="#a855f7"
            intensity={2.2}
            spread={2.5}
            origin="top-right"
            tilt={5}
            saturation={1.5}
            blend={0.75}
            falloff={1.6}
            opacity={0.8}
          />
        </div>

        {/* Floating 3D Parallax Background across entire website */}
        <Floating3DBackground />

        {/* Dynamic Background Noise & Glow Grid */}
        <div className="fixed inset-0 grid-pattern opacity-[0.15] pointer-events-none z-0" />
        
        {/* Navigation Bar */}
        <Navbar />

        {/* Page Content */}
        <main className="flex-1 relative z-10 pt-20">
          {children}
        </main>

        {/* Global Footer */}
        <Footer />
      </body>
    </html>
  );
}
