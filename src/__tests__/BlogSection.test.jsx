import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { BlogSection } from '../App';
import client from '../api/sanityClient';

const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>);

describe('BlogSection', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows loading state initially', () => {
    renderWithRouter(<BlogSection />);
    expect(screen.getByText(/Ielādē rakstus/i)).toBeInTheDocument();
  });

  it('shows error state if fetch fails', async () => {
    jest.spyOn(client, 'fetch').mockImplementation(() => Promise.reject(new Error('fail')));
    renderWithRouter(<BlogSection />);
    await waitFor(() => {
      expect(screen.getByText(/Neizdevās ielādēt rakstus/i)).toBeInTheDocument();
    });
  });

  it('renders posts if fetch succeeds', async () => {
    jest.spyOn(client, 'fetch').mockImplementation(() => Promise.resolve([
      { _id: '1', title: 'Test Post', slug: { current: 'test-post' }, publishedAt: '2024-01-01', body: [{ children: [{ text: 'Excerpt' }] }], author: 'Author', coverImage: { asset: { url: 'cover.jpg' } }, tags: ['tag1'] }
    ]));
    renderWithRouter(<BlogSection />);
    await waitFor(() => {
      expect(screen.getByText(/Test Post/i)).toBeInTheDocument();
      expect(screen.getByText(/Author/i)).toBeInTheDocument();
      expect(screen.getByText(/tag1/i)).toBeInTheDocument();
      expect(screen.getByRole('img', { name: /Test Post/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /Lasīt vairāk/i })).toHaveAttribute('href', '/blog/test-post');
    });
  });
}); 