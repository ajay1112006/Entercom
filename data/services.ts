import { Service } from '../types';

export const SERVICES_DATA: Service[] = [
  {
    id: 'custom-web',
    title: 'Custom Next.js Engineering',
    subtitle: 'High-Performance Web Applications',
    description: 'We build bespoke, production-ready websites for clients using Next.js App Router, TypeScript, and server-side optimization. Zero bloat, instant hydration, and 100/100 performance scores.',
    icon: 'Code2',
    deliverables: [
      'Next.js App Router Architecture',
      'TypeScript strict typing',
      'SEO & OpenGraph optimization',
      'Tailwind CSS custom design system',
      'Vercel automated CI/CD deployment'
    ],
    badge: 'Core Specialty',
    highlight: true
  },
  {
    id: 'motion-webgl',
    title: 'Motion & Interactive Design',
    subtitle: 'Immersive Web Micro-Interactions',
    description: 'Elevate your brand beyond flat static web pages. We implement fluid scroll triggers, Framer Motion transitions, physics-based UI elements, and WebGL particle effects that captivate visitors.',
    icon: 'Sparkles',
    deliverables: [
      'Scroll-driven story animations',
      'Smooth page transition choreography',
      'Custom hover states & cursor dynamics',
      '3D element embedding',
      'Responsive touch gestures'
    ],
    badge: 'Award Winning',
    highlight: true
  },
  {
    id: 'headless-ecommerce',
    title: 'Headless E-Commerce Flagships',
    subtitle: 'Scalable Commerce Systems',
    description: 'High-converting online store experiences powered by Next.js and headless commerce APIs (Shopify, Stripe, Medusa). Custom product visualizers, instant checkout flows, and sub-second page switches.',
    icon: 'ShoppingBag',
    deliverables: [
      'Custom Shopify storefront integration',
      'Sub-second product catalog search',
      'Optimized cart & checkout drawer',
      'Global currency & localization',
      'High conversion UX audit'
    ]
  },
  {
    id: 'design-systems',
    title: 'Brand Identity & Design Systems',
    subtitle: 'Scalable Visual Tokens',
    description: 'We build comprehensive Figma design systems complete with reusable React component libraries, dark/light token architecture, visual documentation, and brand guidelines.',
    icon: 'Palette',
    deliverables: [
      'Figma to Code token synchronization',
      'Accessible React component libraries',
      'Typography & Color scale design',
      'Interactive component storybooks',
      'Cross-platform brand assets'
    ]
  },
  {
    id: 'speed-seo',
    title: 'Core Web Vitals & Technical SEO',
    subtitle: 'Lightning Fast Page Velocity',
    description: 'Transform sluggish legacy sites into speed demons. We perform deep memory leak audits, image pipeline optimization, code splitting, edge caching, and semantic HTML enhancements.',
    icon: 'Zap',
    deliverables: [
      '99+ Lighthouse performance guarantee',
      'Cumulative Layout Shift (CLS) elimination',
      'Dynamic edge caching strategy',
      'Structured JSON-LD schema markup',
      'Comprehensive Core Web Vitals audit'
    ]
  }
];

export const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Discovery & Product Architecture',
    description: 'We analyze your product goals, target audience, brand aesthetic, and technical requirements to define a precise roadmap.'
  },
  {
    step: '02',
    title: 'Interactive Design & Prototyping',
    description: 'We craft high-fidelity Figma prototypes with motion concepts, dynamic typography, and dark/light color palettes.'
  },
  {
    step: '03',
    title: 'Bespoke Next.js Engineering',
    description: 'We write clean, modular React & TypeScript code with Framer Motion animations, thorough test coverage, and strict performance metrics.'
  },
  {
    step: '04',
    title: 'Testing & Global Edge Deployment',
    description: 'Automated Vitest suite execution, cross-device QA, accessibility checks, and 1-click deployment to Vercel edge infrastructure.'
  }
];
