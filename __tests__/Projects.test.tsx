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
  it('renders portfolio banner and project list', () => {
    render(<ProjectsPage />);
    expect(screen.getByText(/Portfolio Showcase/i)).toBeInTheDocument();
    expect(screen.getAllByText('LinkIt Nexus')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Elyon Traders')[0]).toBeInTheDocument();
    expect(screen.getAllByText('DMI Placement Portal')[0]).toBeInTheDocument();
  });

  it('opens project modal on click', () => {
    render(<ProjectsPage />);
    const linkitCards = screen.getAllByText('LinkIt Nexus');
    expect(linkitCards[0]).toBeInTheDocument();
    fireEvent.click(linkitCards[0]);
  });
});
