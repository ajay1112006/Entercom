import { Project } from '../types';

export const PROJECTS_DATA: Project[] = [
  {
    id: '1',
    title: 'LinkIt Nexus',
    slug: 'linkit-nexus',
    category: 'EdTech & AI',
    client: 'LinkIt Ecosystem Foundation',
    description: 'Unified career & curriculum mobility platform bridging academic syllabi with industry production engineering mastery.',
    fullDescription: 'Entercom engineered LinkIt Nexus, a next-generation platform interconnecting students, academic faculty, and global enterprise recruiters. Powered by AI-driven skill gap matrix analysis, corporate faculty sabbaticals, live capstone challenges, and automated curriculum audit suites.',
    impact: 'Connecting 240+ premier universities with 480+ technology enterprises to close the graduate skill gap.',
    metrics: [
      { label: 'Partner Universities', value: '240+' },
      { label: 'Enterprise Network', value: '480+' },
      { label: 'Skill Match Index', value: '96%' }
    ],
    tags: ['Next.js App Router', 'TypeScript', 'Tailwind CSS', 'AI Analytics', 'Framer Motion'],
    imageUrl: '/linkit.png?v=cropped',
    featured: true,
    year: '2026',
    link: 'https://linkit-omega.vercel.app/',
    testimonial: {
      quote: 'LinkIt completely transformed how our university aligns engineering curricula with real production stacks.',
      author: 'Dr. Aris Thorne',
      role: 'Dean of Academic Affairs, LinkIt Consortium'
    }
  },
  {
    id: '2',
    title: 'Elyon Traders',
    slug: 'elyon-traders',
    category: 'Fintech & Logistics',
    client: 'Elyon Traders Enterprise',
    description: 'Enterprise operations & financial intelligence hub for daily employee attendance, itemized P&L, and freight logistics.',
    fullDescription: 'Entercom designed the end-to-end enterprise portal for Elyon Traders ("The Most High"). Built for high-volume trade operations, the system streamlines 4-session daily employee attendance tracking, real-time order P&L profit calibration, raw materials trucking logistics, and automated GST ledger billing in a gold-accented dark interface.',
    impact: 'Automated daily financial ledger auditing and reduced operational tracking overhead by 75%.',
    metrics: [
      { label: 'Daily Tracking', value: '4 Sessions' },
      { label: 'Operational Speed', value: '+75%' },
      { label: 'Ledger Precision', value: '100%' }
    ],
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Dark Mode UI', 'Financial Analytics'],
    imageUrl: '/elyon.png?v=cropped',
    featured: true,
    year: '2026',
    link: 'https://bricks-2026.vercel.app/',
    testimonial: {
      quote: 'The financial intelligence and attendance monitoring systems built by Entercom gave us 100% operational transparency.',
      author: 'Samuel Bennett',
      role: 'Managing Director, Elyon Traders'
    }
  },
  {
    id: '3',
    title: 'DMI Placement Portal',
    slug: 'dmi-placement-portal',
    category: 'Enterprise',
    client: 'DMI Group of Institutions',
    description: 'Unified central recruitment ecosystem interconnecting 7 engineering campuses with 500+ corporate recruiters.',
    fullDescription: 'Entercom built the DMI Central Campus Placement Portal (CPP) to serve as a single-window recruitment drive platform across 7 constituent engineering institutions. Features interactive 3D placement network feeds, student eligibility verification, and real-time recruitment drive analytics.',
    impact: 'Achieved a 95%+ campus placement success rate with top CTC compensation packages reaching ₹18.5 LPA.',
    metrics: [
      { label: 'Placement Rate', value: '95%+' },
      { label: 'Highest Package', value: '₹18.5 LPA' },
      { label: 'Constituent Campuses', value: '7 Institutions' }
    ],
    tags: ['Next.js App Router', 'Three.js / 3D Canvas', 'Tailwind CSS', 'Framer Motion', 'TypeScript'],
    imageUrl: '/placement.png?v=cropped',
    featured: true,
    year: '2026',
    link: 'https://campus-placement-ten.vercel.app/',
    testimonial: {
      quote: 'Entercom engineered a seamless single-window recruitment portal that unified placement drives across all 7 of our campuses.',
      author: 'Prof. R. Sundaram',
      role: 'Director of Placements, DMI Group'
    }
  }
];
