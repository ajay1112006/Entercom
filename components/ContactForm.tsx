'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { z } from 'zod';
import { Send, CheckCircle2, AlertCircle, Sparkles, Loader2, RefreshCw } from 'lucide-react';
import { Button } from './ui/Button';

// Contact Form Zod Schema
export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().optional(),
  service: z.string().min(1, 'Please select a service'),
  budget: z.string().min(1, 'Please select a budget range'),
  message: z.string().min(10, 'Project description must be at least 10 characters'),
});

export type ContactFormInputs = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormInputs>({
    name: '',
    email: '',
    company: '',
    service: 'custom-web',
    budget: '$15k - $30k',
    message: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormInputs, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for edited field
    if (errors[name as keyof ContactFormInputs]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate with Zod
    const result = contactSchema.safeParse(formData);
    
    if (!result.success) {
      const formattedErrors: Partial<Record<keyof ContactFormInputs, string>> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof ContactFormInputs;
        formattedErrors[field] = issue.message;
      });
      setErrors(formattedErrors);
      return;
    }

    // Client-side validation successful -> Simulate submission
    setErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      company: '',
      service: 'custom-web',
      budget: '$15k - $30k',
      message: '',
    });
    setErrors({});
    setIsSubmitted(false);
  };

  return (
    <div className="relative w-full">
      <AnimatePresence mode="wait">
        {isSubmitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="p-8 sm:p-12 rounded-3xl bg-surface-card border border-emerald-500/30 text-center space-y-6 shadow-2xl"
          >
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-white tracking-tight">
                Inquiry Received!
              </h3>
              <p className="text-white/70 text-sm max-w-md mx-auto leading-relaxed">
                Thank you, <span className="text-white font-semibold">{formData.name}</span>. Our lead architect will review your project requirements and respond within 24 hours.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-xs text-white/60 max-w-sm mx-auto space-y-1 text-left">
              <div className="flex justify-between">
                <span className="text-white/40">Selected Service:</span>
                <span className="text-white font-mono">{formData.service}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/40">Estimated Budget:</span>
                <span className="text-white font-mono">{formData.budget}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/40">Contact Email:</span>
                <span className="text-white font-mono">{formData.email}</span>
              </div>
            </div>

            <Button
              onClick={handleReset}
              variant="outline"
              size="md"
              icon={<RefreshCw className="w-4 h-4" />}
            >
              Submit Another Request
            </Button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-6 sm:p-10 rounded-3xl bg-surface-card border border-surface-border space-y-6 shadow-2xl"
            noValidate
          >
            <div className="border-b border-surface-border pb-4 space-y-1">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                Start Your Project <Sparkles className="w-4 h-4 text-indigo-400" />
              </h3>
              <p className="text-white/60 text-xs">
                Tell us about your project vision and target timeline.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Name Input */}
              <div className="space-y-1.5">
                <label htmlFor="name" className="block text-xs font-mono text-white/80">
                  Your Name <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Sarah Jenkins"
                  className={`w-full bg-background/80 border ${
                    errors.name ? 'border-rose-500/80 focus:border-rose-500' : 'border-surface-border focus:border-indigo-500/80'
                  } text-white text-sm rounded-xl px-4 py-3 focus:outline-none transition-colors placeholder:text-white/20`}
                />
                {errors.name && (
                  <p className="text-[11px] text-rose-400 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3 h-3" /> {errors.name}
                  </p>
                )}
              </div>

              {/* Email Input */}
              <div className="space-y-1.5">
                <label htmlFor="email" className="block text-xs font-mono text-white/80">
                  Work Email <span className="text-rose-400">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="sarah@company.com"
                  className={`w-full bg-background/80 border ${
                    errors.email ? 'border-rose-500/80 focus:border-rose-500' : 'border-surface-border focus:border-indigo-500/80'
                  } text-white text-sm rounded-xl px-4 py-3 focus:outline-none transition-colors placeholder:text-white/20`}
                />
                {errors.email && (
                  <p className="text-[11px] text-rose-400 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3 h-3" /> {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Service Select */}
              <div className="space-y-1.5">
                <label htmlFor="service" className="block text-xs font-mono text-white/80">
                  Primary Service Needed
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full bg-background/80 border border-surface-border text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500/80 transition-colors"
                >
                  <option value="custom-web">Custom Next.js Engineering</option>
                  <option value="motion-webgl">Motion & Micro-Interactions</option>
                  <option value="headless-ecommerce">Headless E-Commerce Store</option>
                  <option value="design-systems">Design System & Rebrand</option>
                  <option value="speed-seo">Core Web Vitals Speed Boost</option>
                </select>
              </div>

              {/* Budget Select */}
              <div className="space-y-1.5">
                <label htmlFor="budget" className="block text-xs font-mono text-white/80">
                  Estimated Budget
                </label>
                <select
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full bg-background/80 border border-surface-border text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500/80 transition-colors"
                >
                  <option value="$10k - $15k">$10k - $15k</option>
                  <option value="$15k - $30k">$15k - $30k</option>
                  <option value="$30k - $50k">$30k - $50k</option>
                  <option value="$50k+">$50k+ Enterprise</option>
                </select>
              </div>
            </div>

            {/* Message Input */}
            <div className="space-y-1.5">
              <label htmlFor="message" className="block text-xs font-mono text-white/80">
                Project Overview & Goals <span className="text-rose-400">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your brand vision, target launch date, and key requirements..."
                className={`w-full bg-background/80 border ${
                  errors.message ? 'border-rose-500/80 focus:border-rose-500' : 'border-surface-border focus:border-indigo-500/80'
                } text-white text-sm rounded-xl px-4 py-3 focus:outline-none transition-colors placeholder:text-white/20 resize-none`}
              />
              {errors.message && (
                <p className="text-[11px] text-rose-400 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3 h-3" /> {errors.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              variant="glow"
              size="lg"
              className="w-full"
              icon={
                isSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )
              }
            >
              {isSubmitting ? 'Validating & Submitting...' : 'Send Project Inquiry'}
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
