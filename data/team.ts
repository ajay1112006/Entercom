import { TeamMember } from '../types';

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: '1',
    name: 'Alexander Wright',
    role: 'Founder & Principal Architect',
    bio: 'Pioneer in modern web engineering and micro-interactions with 12+ years leading full-stack agency projects for high-growth tech brands.',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
    skills: ['Next.js Architecture', 'WebGL Shaders', 'Design Systems', 'Performance Strategy'],
    social: {
      github: 'https://github.com',
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com'
    },
    featured: true
  },
  {
    id: '2',
    name: 'Sophia Chen',
    role: 'Head of Design & Motion',
    bio: 'Specializes in typographic precision, spatial visual aesthetics, and fluid interaction physics inspired by modern motion-first web experiences.',
    imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop',
    skills: ['Figma Master', 'Framer Motion', '3D Visual Direction', 'UI/UX Strategy'],
    social: {
      dribbble: 'https://dribbble.com',
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com'
    },
    featured: true
  },
  {
    id: '3',
    name: 'Marcus Vance',
    role: 'Lead Frontend Engineer',
    bio: 'Dedicated to sub-second page loads, accessible DOM structures, custom React hooks, and ultra-smooth CSS keyframe orchestration.',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop',
    skills: ['React / Next.js', 'Tailwind CSS', 'TypeScript', 'State Management'],
    social: {
      github: 'https://github.com',
      twitter: 'https://twitter.com'
    },
    featured: true
  },
  {
    id: '4',
    name: 'Elena Rostova',
    role: 'Full-Stack & Cloud Specialist',
    bio: 'Expert in Vercel Edge networks, API route optimization, serverless architecture, and headless CMS integrations.',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop',
    skills: ['Next.js App Router', 'Edge Functions', 'PostgreSQL / Prisma', 'GraphQL'],
    social: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com'
    },
    featured: false
  },
  {
    id: '5',
    name: 'David Sterling',
    role: 'Creative Director',
    bio: 'Crafts narrative-driven digital visual identities that convert visitors into brand advocates across tech and fashion sectors.',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop',
    skills: ['Brand Identity', 'Art Direction', 'Motion Graphics', 'Copywriting'],
    social: {
      dribbble: 'https://dribbble.com',
      twitter: 'https://twitter.com'
    },
    featured: false
  },
  {
    id: '6',
    name: 'Aria Takahashi',
    role: 'QA & Performance Engineer',
    bio: 'Obsessed with Web Vitals, automated test suites, accessibility compliance (WCAG 2.1 AAA), and cross-browser rendering integrity.',
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop',
    skills: ['Playwright / Vitest', 'Lighthouse Audits', 'WCAG Accessibility', 'Performance Benchmarking'],
    social: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com'
    },
    featured: false
  }
];
