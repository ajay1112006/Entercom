import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import ProjectsPage from '../app/projects/page';

// Mock framer-motion AnimatePresence to instantly unmount exiting items in tests
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion');
  return {
    ...actual,
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  };
});

describe('ProjectsPage Component', () => {
  it('renders project list and category filters', () => {
    render(<ProjectsPage />);
    expect(screen.getByText(/Portfolio Showcase/i)).toBeInTheDocument();
    expect(screen.getByText('Aetheris Horizon')).toBeInTheDocument();
    expect(screen.getByText('PulsePay Global')).toBeInTheDocument();
  });

  it('filters projects when category button is clicked', () => {
    render(<ProjectsPage />);
    const saasFilterBtn = screen.getByRole('button', { name: 'SaaS' });
    fireEvent.click(saasFilterBtn);
    expect(screen.getByText('Aetheris Horizon')).toBeInTheDocument();
  });

  it('filters projects by search query', () => {
    render(<ProjectsPage />);
    const searchInput = screen.getByPlaceholderText(/search title, tech, or client/i);
    fireEvent.change(searchInput, { target: { value: 'Aetheris' } });
    expect(screen.getByText('Aetheris Horizon')).toBeInTheDocument();
    expect(screen.queryByText('PulsePay Global')).not.toBeInTheDocument();
  });
});
