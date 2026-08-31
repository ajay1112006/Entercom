export interface Project {
  id: string;
  title: string;
  slug: string;
  category: 'SaaS' | 'E-Commerce' | 'Web3' | 'Studio' | 'Enterprise';
  client: string;
  description: string;
  fullDescription: string;
  impact: string;
  metrics: {
    label: string;
    value: string;
  }[];
  tags: string[];
  imageUrl: string;
  featured: boolean;
  year: string;
  link?: string;
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  skills: string[];
  social: {
    github?: string;
    twitter?: string;
    linkedin?: string;
    dribbble?: string;
  };
  featured?: boolean;
}

export interface Service {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  deliverables: string[];
  badge?: string;
  highlight?: boolean;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatarUrl: string;
  rating: number;
  projectSlug?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  service: string;
  budget: string;
  message: string;
}
