import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';

const QuizSection = require('../App').QuizSection || require('../App').default.QuizSection;

const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>);

describe('QuizSection', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve({ success: true }) }));
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders the first question and allows progressing', async () => {
    renderWithRouter(<QuizSection />);
    expect(screen.getByText(/Kāds ir Jūsu galvenais finanšu mērķis/i)).toBeInTheDocument();
    // Select an answer
    await userEvent.click(screen.getByLabelText(/Uzkrāt pensijai/i));
    // Click next
    await userEvent.click(screen.getByRole('button', { name: /Tālāk/i }));
    // Next question should appear
    expect(screen.getByText(/Vai Jums jau ir izveidoti kādi uzkrājumi/i)).toBeInTheDocument();
  });

  it('prevents progressing without selecting an answer', async () => {
    renderWithRouter(<QuizSection />);
    // Try to click next without selecting
    await userEvent.click(screen.getByRole('button', { name: /Tālāk/i }));
    // Should still be on the first question
    expect(screen.getByText(/Kāds ir Jūsu galvenais finanšu mērķis/i)).toBeInTheDocument();
  });

  it('can complete the full quiz flow and see thank you message', async () => {
    renderWithRouter(<QuizSection />);
    // Step 1
    await userEvent.click(screen.getByLabelText(/Uzkrāt pensijai/i));
    await userEvent.click(screen.getByRole('button', { name: /Tālāk/i }));
    // Step 2
    await userEvent.click(screen.getByLabelText(/Jā, ir stabili uzkrājumi/i));
    await userEvent.click(screen.getByRole('button', { name: /Tālāk/i }));
    // Step 3
    await userEvent.click(screen.getByLabelText(/Mērens/i));
    await userEvent.click(screen.getByRole('button', { name: /Tālāk/i }));
    // Step 4
    await userEvent.click(screen.getByLabelText(/Vidējā termiņā/i));
    await userEvent.click(screen.getByRole('button', { name: /Tālāk/i }));
    // Step 5 (contacts)
    await userEvent.type(screen.getByPlaceholderText(/Vārds, Uzvārds/i), 'Test User');
    await userEvent.type(screen.getByPlaceholderText(/E-pasts/i), 'test@example.com');
    await userEvent.type(screen.getByPlaceholderText(/Tālruņa numurs/i), '12345678');
    await userEvent.click(screen.getByRole('button', { name: /Nosūtīt/i }));
    // Thank you message
    expect(await screen.findByText(/Jūsu pieteikums ir saņemts/i)).toBeInTheDocument();
  });

  it('shows an error message if submission fails', async () => {
    global.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve({ success: false, error: 'Server error' }) }));
    renderWithRouter(<QuizSection />);
    // Step 1
    await userEvent.click(screen.getByLabelText(/Uzkrāt pensijai/i));
    await userEvent.click(screen.getByRole('button', { name: /Tālāk/i }));
    // Step 2
    await userEvent.click(screen.getByLabelText(/Jā, ir stabili uzkrājumi/i));
    await userEvent.click(screen.getByRole('button', { name: /Tālāk/i }));
    // Step 3
    await userEvent.click(screen.getByLabelText(/Mērens/i));
    await userEvent.click(screen.getByRole('button', { name: /Tālāk/i }));
    // Step 4
    await userEvent.click(screen.getByLabelText(/Vidējā termiņā/i));
    await userEvent.click(screen.getByRole('button', { name: /Tālāk/i }));
    // Step 5 (contacts)
    await userEvent.type(screen.getByPlaceholderText(/Vārds, Uzvārds/i), 'Test User');
    await userEvent.type(screen.getByPlaceholderText(/E-pasts/i), 'test@example.com');
    await userEvent.type(screen.getByPlaceholderText(/Tālruņa numurs/i), '12345678');
    await userEvent.click(screen.getByRole('button', { name: /Nosūtīt/i }));
    // Error message
    expect(await screen.findByText(/Neizdevās nosūtīt datus|Server error/i)).toBeInTheDocument();
  });
}); 