import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';

// Import ErrorBoundary directly from App.jsx
const ErrorBoundary = require('../App').ErrorBoundary || require('../App').default.ErrorBoundary;

// Helper to render with router
const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>);

describe('ErrorBoundary', () => {
  it('catches errors and displays fallback UI', () => {
    // Component that throws
    const ProblemChild = () => { throw new Error('Test error'); };
    renderWithRouter(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );
    expect(screen.getByText(/Kaut kas nogāja greizi/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Pārlādēt lapu/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Ziņot par problēmu/i })).toBeInTheDocument();
  });
}); 