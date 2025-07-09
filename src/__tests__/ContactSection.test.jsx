import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

// Helper to render with router
const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>);



// Mock useNavigate to prevent redirect after submit
jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => jest.fn(),
  };
});

describe('ContactSection (isolated)', () => {
  it('renders without crashing', () => {
    const ContactSection = require('../App').ContactSection || require('../App').default.ContactSection;
    renderWithRouter(<ContactSection />);
    expect(screen.getByText(/Sazinies ar mani/i)).toBeInTheDocument();
  });
});

describe('ContactSection', () => {
  beforeEach(() => {
    // Mock fetch for Formspree
    global.fetch = jest.fn(() =>
      Promise.resolve({ ok: true, json: () => Promise.resolve({}) })
    );
    localStorage.clear();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders the contact form', () => {
    renderWithRouter(<App />);
    expect(screen.getByPlaceholderText(/Vārds/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/E-pasts/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Tavs jautājums/i)).toBeInTheDocument();
    // Check for GDPR checkbox
    expect(screen.getByLabelText(/Piekrītu datu apstrādei/i)).toBeInTheDocument();
  });

  it('shows validation errors for required fields', async () => {
    renderWithRouter(<App />);
    fireEvent.submit(screen.getByTestId('contact-form'));
    expect(await screen.findAllByText(/obligāts/i)).not.toHaveLength(0);
  });

  it('submits form successfully and resets', async () => {
    renderWithRouter(<App />);
    const nameInput = screen.getByPlaceholderText(/Vārds/i);
    const emailInput = screen.getByPlaceholderText(/E-pasts/i);
    const messageInput = screen.getByPlaceholderText(/Tavs jautājums/i);
    const gdprCheckbox = screen.getByLabelText(/Piekrītu datu apstrādei/i);
    
    // Fill out form
    await userEvent.type(nameInput, 'Test User');
    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(messageInput, 'Test message');
    await userEvent.click(gdprCheckbox);
    
    // Submit form
    fireEvent.submit(screen.getByTestId('contact-form'));
    
    // Check that form is reset after successful submission
    await waitFor(() => {
      expect(nameInput).toHaveValue('');
      expect(emailInput).toHaveValue('');
      expect(messageInput).toHaveValue('');
      expect(gdprCheckbox).not.toBeChecked();
    });
  });
}); 