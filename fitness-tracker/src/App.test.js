import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import App from './App';

describe('App', () => {
  test('renders the navigation and home page by default', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('FitTrack')).toBeInTheDocument();
    expect(screen.getByText('Welcome to FitTrack')).toBeInTheDocument();
  });

  test('renders the exercises page and loads exercises', async () => {
    render(
      <MemoryRouter initialEntries={['/exercises']}>
        <App />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText('Push-ups')).toBeInTheDocument();
    });
  });

  test('renders the 404 page for an unknown route', () => {
    render(
      <MemoryRouter initialEntries={['/nonexistent-route']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('404 - Page Not Found')).toBeInTheDocument();
  });
});
