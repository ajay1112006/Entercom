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

  it('toggles mobile menu on button click', () => {
    render(<Navbar />);
    const menuBtn = screen.getAllByLabelText(/toggle menu/i)[0];
    expect(menuBtn).toBeInTheDocument();
    fireEvent.click(menuBtn);
  });
});
