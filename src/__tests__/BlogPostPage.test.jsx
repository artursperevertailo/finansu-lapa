import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { BlogPostPage } from '../App';
import client from '../api/sanityClient';

const renderWithRouter = (ui, { route = '/blog/test-post' } = {}) =>
  render(
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route path="/blog/:slug" element={ui} />
      </Routes>
    </MemoryRouter>
  );

describe('BlogPostPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows loading state initially', () => {
    renderWithRouter(<BlogPostPage />);
    expect(screen.getByText(/Ielādē rakstu/i)).toBeInTheDocument();
  });

  it('shows error state if fetch fails', async () => {
    jest.spyOn(client, 'fetch').mockImplementation(() => Promise.reject(new Error('fail')));
    renderWithRouter(<BlogPostPage />);
    await waitFor(() => {
      expect(screen.getByText(/Neizdevās ielādēt rakstu/i)).toBeInTheDocument();
    });
  });

  it('shows 404 state if post not found', async () => {
    jest.spyOn(client, 'fetch').mockImplementation(() => Promise.resolve(null));
    renderWithRouter(<BlogPostPage />);
    await waitFor(() => {
      expect(screen.getByText(/404/i)).toBeInTheDocument();
      expect(screen.getByText(/Raksts nav atrasts/i)).toBeInTheDocument();
    });
  });

  it('renders post if fetch succeeds', async () => {
    jest.spyOn(client, 'fetch').mockImplementation(() => Promise.resolve({
      title: 'Test Post',
      publishedAt: '2024-01-01',
      body: [{ children: [{ text: 'Excerpt' }] }],
      author: 'Author',
      coverImage: { asset: { url: 'cover.jpg' } },
      tags: ['tag1']
    }));
    renderWithRouter(<BlogPostPage />);
    await waitFor(() => {
      expect(screen.getByText(/Test Post/i)).toBeInTheDocument();
      expect(screen.getByText(/Author/i)).toBeInTheDocument();
      expect(screen.getByText(/tag1/i)).toBeInTheDocument();
      expect(screen.getByRole('img', { name: /Test Post/i })).toBeInTheDocument();
    });
  });
}); 