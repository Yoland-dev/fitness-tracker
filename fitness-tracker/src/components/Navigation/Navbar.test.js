import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Navbar from './Navbar';

describe('Navbar', () => {
  test('renders links to all main routes', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    ['Home', 'Exercises', 'Workout Planner', 'History', 'Progress'].forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  test('applies active styling to the current route', () => {
    render(
      <MemoryRouter initialEntries={['/exercises']}>
        <Navbar />
      </MemoryRouter>
    );
    expect(screen.getByText('Exercises').className).toMatch(/active/);
  });
});
