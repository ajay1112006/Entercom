import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Navbar } from '../components/Navbar';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

describe('Navbar Component', () => {
  it('renders brand logo and nav links', () => {
    render(<Navbar />);
    expect(screen.getByText('Enter')).toBeInTheDocument();
    expect(screen.getByText('com')).toBeInTheDocument();
    expect(screen.getAllByText('Home')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Projects')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Team')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Contact')[0]).toBeInTheDocument();
  });

  it('renders Start a Project CTA button', () => {
    render(<Navbar />);
    const ctaBtn = screen.getAllByText('Start a Project')[0];
    expect(ctaBtn).toBeInTheDocument();
    const link = ctaBtn.closest('a');
    expect(link).toHaveAttribute('href', '/contact');
  });
});
