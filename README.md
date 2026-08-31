# Entercom — Production-Grade Next.js Web Agency Portfolio

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

**Entercom** is a bespoke web engineering & motion studio that builds high-performance, animation-rich websites for forward-thinking clients. This repository contains the complete production-ready, fully responsive portfolio application built with **Next.js 14+ (App Router)**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, and **Zod**.

---

## Key Features

- **Agency Value Proposition**: Focused messaging highlighting Entercom's client web development services.
- **Visual & Motion Excellence**: Dark aesthetic inspired by [motionsites.ai](https://motionsites.ai/), featuring glowing radial spotlights, micro-animations, glassmorphism cards, and fluid 60fps page transitions.
- **Projects Showcase Page**: Interactive showcase with category filtering (SaaS, E-Commerce, Web3, Studio, Enterprise), real-time text search, and modal overlay case studies with client impact metrics.
- **Team & Culture Page**: Team member spotlight cards with avatar zoom hover, skill tags, agency ethos blocks, and career inquiry CTA.
- **Contact Page & Client Validation**: Full client-side input validation powered by **Zod**, real-time field error popovers, loading spinners, and interactive submission feedback states.
- **Production Safety**: Custom 404 (`not-found.tsx`) and global runtime error boundaries (`error.tsx`).
- **Automated Test Suite**: Unit & integration test coverage using **Vitest** + **React Testing Library**.

---

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Validation**: Zod & React Hook patterns
- **Testing**: Vitest + @testing-library/react + jsdom
- **Target Deployment**: Vercel Edge Platform

---

## Getting Started

### Prerequisites

- **Node.js**: v18.17.0 or higher (v24.x recommended)
- **npm**: v9.x or higher

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/entercom-portfolio.git
   cd entercom-portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start local development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Run automated test suite**:
   ```bash
   npm run test
   ```

5. **Build for production**:
   ```bash
   npm run build
   ```

---

## Project Structure

```
.
├── app/
│   ├── globals.css         # Global Tailwind styles & dark theme utilities
│   ├── layout.tsx          # Root Layout with Navbar, Footer, and font setups
│   ├── page.tsx            # Home Landing page (Hero, Work, Services, Process)
│   ├── projects/           # Projects Showcase with search & category filters
│   │   └── page.tsx
│   ├── team/               # Team members & culture page
│   │   └── page.tsx
│   ├── contact/            # Contact form page
│   │   └── page.tsx
│   ├── not-found.tsx       # Custom 404 error page
│   └── error.tsx           # Global runtime error boundary
├── components/
│   ├── Navbar.tsx          # Responsive fixed header with blur backdrop
│   ├── Footer.tsx          # Studio footer with fast links & newsletter
│   ├── ProjectCard.tsx     # Showcase card with image zoom & metrics
│   ├── ProjectModal.tsx    # Modal overlay for detailed case study
│   ├── TeamCard.tsx       # Team member profile card
│   ├── ServiceCard.tsx    # Agency service capability card
│   ├── ContactForm.tsx     # Client-side validated project inquiry form
│   └── ui/                 # Reusable UI primitives (Button, Badge, Card)
├── data/
│   ├── projects.ts         # Portfolio project items & metrics
│   ├── team.ts             # Team member profiles
│   ├── services.ts         # Agency services & process steps
│   └── testimonials.ts     # Client testimonials
├── types/
│   └── index.ts            # TypeScript interfaces
├── __tests__/              # Vitest & React Testing Library test suites
├── vitest.config.ts        # Vitest configuration
├── next.config.js          # Next.js optimization config
├── tailwind.config.js      # Custom dark theme color system
└── tsconfig.json           # TypeScript configuration
```

---

## Deployment to Vercel

This repository is optimized for immediate, zero-config deployment to **Vercel**.

### Option A: 1-Click Vercel Import (Recommended)

1. Push this repository to GitHub, GitLab, or Bitbucket.
2. Visit [https://vercel.com/new](https://vercel.com/new).
3. Select your repository and click **Import**.
4. Vercel will automatically detect Next.js settings:
   - **Framework Preset**: Next.js
   - **Build Command**: `next build`
   - **Output Directory**: `.next`
5. Click **Deploy**. Your website will be live in under 60 seconds with SSL enabled.

### Option B: Deploying via Vercel CLI

1. Install Vercel CLI globally:
   ```bash
   npm i -g vercel
   ```
2. Log in and deploy from the project root:
   ```bash
   vercel
   ```
3. For production deployment:
   ```bash
   vercel --prod
   ```

---

## License

MIT © [Entercom Agency](https://entercom.dev). Built with precision and care.
