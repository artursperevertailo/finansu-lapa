import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ThankYouPage, PrivacyPolicyPage, NotFoundPage } from '../App';

const renderWithRouter = (ui, { route = '/' } = {}) =>
  render(
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route path="/thank-you" element={<ThankYouPage />} />
        <Route path="/privatuma-politika" element={<PrivacyPolicyPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </MemoryRouter>
  );

describe('Pages', () => {
  describe('ThankYouPage', () => {
    it('renders thank you message', () => {
      renderWithRouter(<ThankYouPage />, { route: '/thank-you' });
      expect(screen.getByText(/Paldies par saziņu/i)).toBeInTheDocument();
      expect(screen.getByText(/Jūsu ziņa ir veiksmīgi nosūtīta/i)).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /Uz sākumlapu/i })).toHaveAttribute('href', '/');
    });
  });

  describe('PrivacyPolicyPage', () => {
    it('renders privacy policy content', () => {
      renderWithRouter(<PrivacyPolicyPage />, { route: '/privatuma-politika' });
      expect(screen.getByText(/Privātuma politika/i)).toBeInTheDocument();
      expect(screen.getByText(/Jūsu privātums mums ir svarīgs/i)).toBeInTheDocument();
      expect(screen.getByText(/Kādi dati tiek ievākti/i)).toBeInTheDocument();
      expect(screen.getByText(/Kā dati tiek izmantoti/i)).toBeInTheDocument();
    });
  });

  describe('NotFoundPage', () => {
    it('renders 404 message', () => {
      renderWithRouter(<NotFoundPage />, { route: '/nonexistent' });
      expect(screen.getByText(/Lapa nav atrasta/i)).toBeInTheDocument();
      expect(screen.getByText(/404/i)).toBeInTheDocument();
      expect(screen.getByText(/Atvainojiet, šāda lapa neeksistē/i)).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /Uz sākumlapu/i })).toHaveAttribute('href', '/');
    });
  });
}); 