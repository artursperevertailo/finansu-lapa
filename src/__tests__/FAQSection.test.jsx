import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { FAQSection } from '../App';

// Mock the Sanity client
const mockFetch = jest.fn(() => Promise.resolve([]));
jest.mock('../api/sanityClient', () => ({
  default: {
    fetch: mockFetch,
  },
}));

const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>);

describe('FAQSection', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows loading state initially', () => {
    renderWithRouter(<FAQSection />);
    expect(screen.getByText(/Ielādē jautājumus/i)).toBeInTheDocument();
  });

  it('shows error state if fetch fails', async () => {
    mockFetch.mockImplementation(() => Promise.reject(new Error('fail')));
    renderWithRouter(<FAQSection />);
    await waitFor(() => {
      expect(screen.getByText(/Neizdevās ielādēt jautājumus/i)).toBeInTheDocument();
    });
  });

  it('renders FAQs if fetch succeeds', async () => {
    const mockFaqs = [
      {
        _id: '1',
        question: 'Kā sākt uzkrāt?',
        answer: 'Sāciet ar nelielām, regulārām iemaksām un izvēlieties piemērotu risinājumu.',
        order: 1,
        category: 'Uzkrājumi'
      },
      {
        _id: '2',
        question: 'Kāda ir minimālā iemaksa?',
        answer: 'Minimālā iemaksa ir 10 eiro mēnesī.',
        order: 2,
        category: 'Uzkrājumi'
      },
      {
        _id: '3',
        question: 'Vai ir droši?',
        answer: 'Jā, visi risinājumi ir licencēti un regulēti.',
        order: 1,
        category: 'Drošība'
      }
    ];

    mockFetch.mockImplementation(() => Promise.resolve(mockFaqs));
    renderWithRouter(<FAQSection />);

    await waitFor(() => {
      expect(screen.getByText(/Biežāk uzdotie jautājumi/i)).toBeInTheDocument();
      expect(screen.getByText(/Atbildes uz populārākajiem jautājumiem/i)).toBeInTheDocument();
      expect(screen.getAllByText(/Uzkrājumi/i)).toHaveLength(2); // One in select, one in heading
      expect(screen.getByText(/Drošība/i)).toBeInTheDocument();
      expect(screen.getByText(/Kā sākt uzkrāt/i)).toBeInTheDocument();
      expect(screen.getByText(/Kāda ir minimālā iemaksa/i)).toBeInTheDocument();
      expect(screen.getByText(/Vai ir droši/i)).toBeInTheDocument();
    });
  });

  it('handles FAQ accordion functionality', async () => {
    const mockFaqs = [
      {
        _id: '1',
        question: 'Test question?',
        answer: 'Test answer.',
        order: 1,
        category: 'Test'
      }
    ];

    mockFetch.mockImplementation(() => Promise.resolve(mockFaqs));
    renderWithRouter(<FAQSection />);

    await waitFor(() => {
      expect(screen.getByText(/Test question/i)).toBeInTheDocument();
    });

    // Initially answer should not be visible
    expect(screen.queryByText(/Test answer/i)).not.toBeInTheDocument();

    // Click to expand
    fireEvent.click(screen.getByText(/Test question/i));

    // Answer should now be visible
    await waitFor(() => {
      expect(screen.getByText(/Test answer/i)).toBeInTheDocument();
    });

    // Click to collapse
    fireEvent.click(screen.getByText(/Test question/i));

    // Answer should be hidden again
    await waitFor(() => {
      expect(screen.queryByText(/Test answer/i)).not.toBeInTheDocument();
    });
  });

  it('groups FAQs by category correctly', async () => {
    const mockFaqs = [
      {
        _id: '1',
        question: 'Uzkrājumi question',
        answer: 'Uzkrājumi answer',
        order: 1,
        category: 'Uzkrājumi'
      },
      {
        _id: '2',
        question: 'Apdrošināšana question',
        answer: 'Apdrošināšana answer',
        order: 1,
        category: 'Apdrošināšana'
      },
      {
        _id: '3',
        question: 'No category question',
        answer: 'No category answer',
        order: 1
      }
    ];

    mockFetch.mockImplementation(() => Promise.resolve(mockFaqs));
    renderWithRouter(<FAQSection />);

    await waitFor(() => {
      expect(screen.getAllByText(/Uzkrājumi/i)).toHaveLength(2); // One in select, one in heading
      expect(screen.getByText(/Apdrošināšana/i)).toBeInTheDocument();
      expect(screen.getByText(/Citi/i)).toBeInTheDocument(); // Default category for items without category
    });
  });
}); 