import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { TestimonialsSection } from '../App';

// Mock the Sanity client
const mockFetch = jest.fn(() => Promise.resolve([]));
jest.mock('../api/sanityClient', () => ({
  default: {
    fetch: mockFetch,
  },
}));

const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>);

describe('TestimonialsSection', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows loading state initially', () => {
    renderWithRouter(<TestimonialsSection />);
    expect(screen.getByText(/Ielādē atsauksmes/i)).toBeInTheDocument();
  });

  it('shows error state if fetch fails', async () => {
    mockFetch.mockImplementation(() => Promise.reject(new Error('fail')));
    renderWithRouter(<TestimonialsSection />);
    await waitFor(() => {
      expect(screen.getByText(/Neizdevās ielādēt atsauksmes/i)).toBeInTheDocument();
    });
  });

  it('renders testimonials if fetch succeeds', async () => {
    const mockTestimonials = [
      {
        _id: '1',
        name: 'Jānis Bērziņš',
        quote: 'Ļoti profesionāla attieksme un izcili finanšu risinājumi!',
        company: 'SIA Lieliska Firma',
        rating: 5,
        image: { asset: { url: 'test-image.jpg' } },
        publishedAt: '2024-01-01'
      },
      {
        _id: '2',
        name: 'Anna Ozola',
        quote: 'Palīdzēja saprast uzkrājumu stratēģiju.',
        company: 'Privātpersona',
        rating: 4,
        image: { asset: { url: 'test-image-2.jpg' } },
        publishedAt: '2024-01-02'
      }
    ];

    mockFetch.mockImplementation(() => Promise.resolve(mockTestimonials));
    renderWithRouter(<TestimonialsSection />);

    await waitFor(() => {
      expect(screen.getByText(/Klientu atsauksmes/i)).toBeInTheDocument();
      expect(screen.getByText(/Ko saka mūsu klienti/i)).toBeInTheDocument();
      expect(screen.getByText(/Jānis Bērziņš/i)).toBeInTheDocument();
      expect(screen.getByText(/Anna Ozola/i)).toBeInTheDocument();
      expect(screen.getByText(/Ļoti profesionāla attieksme/i)).toBeInTheDocument();
      expect(screen.getByText(/Palīdzēja saprast uzkrājumu stratēģiju/i)).toBeInTheDocument();
      expect(screen.getByText(/SIA Lieliska Firma/i)).toBeInTheDocument();
      expect(screen.getByText(/Privātpersona/i)).toBeInTheDocument();
    });

    // Check that star ratings are displayed
    const stars = screen.getAllByText('★');
    expect(stars.length).toBeGreaterThan(0);
  });

  it('handles testimonials without images gracefully', async () => {
    const mockTestimonials = [
      {
        _id: '1',
        name: 'Test User',
        quote: 'Test quote',
        rating: 3,
        publishedAt: '2024-01-01'
      }
    ];

    mockFetch.mockImplementation(() => Promise.resolve(mockTestimonials));
    renderWithRouter(<TestimonialsSection />);

    await waitFor(() => {
      expect(screen.getByText(/Test User/i)).toBeInTheDocument();
      expect(screen.getByText(/Test quote/i)).toBeInTheDocument();
    });
  });
}); 