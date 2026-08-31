import { Project } from '../types';

export const PROJECTS_DATA: Project[] = [
  {
    id: '1',
    title: 'Aetheris Horizon',
    slug: 'aetheris-horizon',
    category: 'SaaS',
    client: 'Aetheris Technologies',
    description: 'Interactive AI design platform featuring 60fps WebGL canvas interactions and real-time multiplayer co-editing.',
    fullDescription: 'Entercom engineered a flagship digital experience for Aetheris. The site features customized shader particle systems, instant preview rendering, and a ultra-sleek dark interface optimized for conversion rates.',
    impact: 'Increased landing conversion by +310% and secured $24M Series A funding within 60 days of launch.',
    metrics: [
      { label: 'Speed Score', value: '99/100' },
      { label: 'Conversion Jump', value: '+310%' },
      { label: 'Load Time', value: '0.4s' }
    ],
    tags: ['Next.js', 'Framer Motion', 'WebGL', 'Tailwind CSS', 'TypeScript'],
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
    featured: true,
    year: '2026',
    link: 'https://aetheris-demo.entercom.dev',
    testimonial: {
      quote: 'Entercom delivered a masterpiece website that redefined our brand identity. Their precision and animation expertise are unparalleled.',
      author: 'Marcus Vance',
      role: 'CEO & Founder, Aetheris'
    }
  },
  {
    id: '2',
    title: 'PulsePay Global',
    slug: 'pulsepay-global',
    category: 'Web3',
    client: 'PulsePay Inc.',
    description: 'Next-gen fintech platform with live animated transaction feeds and custom dark glassmorphism layout.',
    fullDescription: 'Entercom crafted the end-to-end web strategy for PulsePay, combining high-speed Next.js server components with subtle ambient glow states, live crypto ticker integration, and zero layout shift.',
    impact: 'Processed over $1.2B in volume in month 1 with 0ms visual latency.',
    metrics: [
      { label: 'Monthly Active Users', value: '450K+' },
      { label: 'User Retention', value: '88%' },
      { label: 'Uptime', value: '99.99%' }
    ],
    tags: ['Next.js', 'Tailwind CSS', 'Framer Motion', 'Zustand', 'Ethers.js'],
    imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1200&auto=format&fit=crop',
    featured: true,
    year: '2026',
    link: 'https://pulsepay-demo.entercom.dev',
    testimonial: {
      quote: 'The team at Entercom understands modern web performance like no one else. Our clients are constantly wowed by the UI interactions.',
      author: 'Elena Rostova',
      role: 'Head of Product, PulsePay'
    }
  },
  {
    id: '3',
    title: 'Verve Haute Atelier',
    slug: 'verve-atelier',
    category: 'E-Commerce',
    client: 'Verve Paris',
    description: 'High-fashion luxury e-commerce experience with interactive 3D product visualizer and fluid cart transitions.',
    fullDescription: 'Designed for a Parisian luxury fashion studio, Verve Atelier combines editorial typography with ultra-fast page transitions, micro-animations on hover, and seamless Shopify headless integration.',
    impact: 'Doubled average order value (AOV) and lowered bounce rate to 18%.',
    metrics: [
      { label: 'AOV Increase', value: '+115%' },
      { label: 'Bounce Rate', value: '18%' },
      { label: 'Core Web Vitals', value: 'All Green' }
    ],
    tags: ['Next.js App Router', 'Shopify Storefront API', 'Framer Motion', 'Tailwind CSS'],
    imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop',
    featured: true,
    year: '2025',
    link: 'https://verve-demo.entercom.dev',
    testimonial: {
      quote: 'Our brand needed a website that felt as luxury as our physical boutiques. Entercom exceeded every expectation.',
      author: 'Camille Laurent',
      role: 'Creative Director, Verve Paris'
    }
  },
  {
    id: '4',
    title: 'Kinetix Robotics',
    slug: 'kinetix-robotics',
    category: 'Studio',
    client: 'Kinetix Labs',
    description: 'Cinematic brand website showcasing AI-driven automation systems with scroll-triggered 3D mesh renders.',
    fullDescription: 'Entercom transformed Kinetix from a stealth hardware lab into an industry icon. Featuring scroll-linked video transitions, dark glass UI cards, and responsive interactive benchmarks.',
    impact: 'Attracted top-tier engineering talent and generated over 5,000 inbound enterprise requests.',
    metrics: [
      { label: 'Inbound Leads', value: '5,000+' },
      { label: 'Time on Page', value: '4m 12s' },
      { label: 'Search Ranking', value: '#1 Organic' }
    ],
    tags: ['Next.js', 'Three.js', 'Framer Motion', 'Tailwind CSS'],
    imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1200&auto=format&fit=crop',
    featured: false,
    year: '2025',
    link: 'https://kinetix-demo.entercom.dev'
  },
  {
    id: '5',
    title: 'Orbital Cloud Platform',
    slug: 'orbital-cloud',
    category: 'Enterprise',
    client: 'Orbital Inc.',
    description: 'Enterprise developer docs and landing suite with live interactive API playground and instant code snippet copies.',
    fullDescription: 'We built a unified developer portal and main site for Orbital Cloud. Designed for extreme developer velocity, fast search indexing, dark mode ergonomics, and instant live code execution.',
    impact: 'Reduced developer onboarding friction by 64%.',
    metrics: [
      { label: 'Dev Onboarding Time', value: '-64%' },
      { label: 'Doc Searches/mo', value: '2.4M' },
      { label: 'Lighthouse Score', value: '100%' }
    ],
    tags: ['Next.js', 'MDX', 'Tailwind CSS', 'TypeScript', 'Algolia'],
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop',
    featured: false,
    year: '2025',
    link: 'https://orbital-demo.entercom.dev'
  },
  {
    id: '6',
    title: 'Nova Sound Audio',
    slug: 'nova-sound',
    category: 'Studio',
    client: 'Nova Audio Labs',
    description: 'Spatial audio hardware showcase with interactive audio spectrum visualizer and sound preview triggers.',
    fullDescription: 'An immersive landing website built for audiophiles. Features real-time Web Audio API sound wave synthesis, dark glowing neon aesthetic, and smooth custom cursor effects.',
    impact: 'Sold out 10,000 initial production units in 14 minutes.',
    metrics: [
      { label: 'Pre-order Sales', value: '$2.8M' },
      { label: 'Sell Out Time', value: '14 min' },
      { label: 'Social Shares', value: '120K+' }
    ],
    tags: ['Next.js', 'Web Audio API', 'Framer Motion', 'Tailwind CSS'],
    imageUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1200&auto=format&fit=crop',
    featured: false,
    year: '2026',
    link: 'https://novasound-demo.entercom.dev'
  }
];
