import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ContactForm } from '../components/ContactForm';

describe('ContactForm Component', () => {
  it('renders all form input fields', () => {
    render(<ContactForm />);
    expect(screen.getByLabelText(/your name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/work email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/primary service needed/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/estimated budget/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/project overview/i)).toBeInTheDocument();
  });

  it('shows error messages when submitting empty required fields', async () => {
    render(<ContactForm />);
    const submitBtn = screen.getByRole('button', { name: /send project inquiry/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/name must be at least 2 characters/i)).toBeInTheDocument();
      expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/project description must be at least 10 characters/i)).toBeInTheDocument();
    });
  });

  it('submits successfully with valid input', async () => {
    render(<ContactForm />);
    
    fireEvent.change(screen.getByLabelText(/your name/i), { target: { value: 'Alex Mercer' } });
    fireEvent.change(screen.getByLabelText(/work email/i), { target: { value: 'alex@startup.io' } });
    fireEvent.change(screen.getByLabelText(/project overview/i), { target: { value: 'We need a high-conversion Next.js website for our brand.' } });

    const submitBtn = screen.getByRole('button', { name: /send project inquiry/i });
    fireEvent.click(submitBtn);

    await waitFor(
      () => {
        expect(screen.getByText(/inquiry received!/i)).toBeInTheDocument();
        expect(screen.getByText(/Alex Mercer/i)).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });
});
