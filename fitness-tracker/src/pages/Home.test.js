import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Home from './Home';

describe('Home', () => {
  test('renders the welcome heading', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(screen.getByText('Welcome to FitTrack')).toBeInTheDocument();
  });

  test('renders motivational audio tracks', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(screen.getByText('Morning Motivation')).toBeInTheDocument();
  });
});
