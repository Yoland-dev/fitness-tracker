import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import App from '../../App';

describe('Navigation Integration', () => {
  test('navigates to the exercises page when the nav link is clicked', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Exercises'));

    await waitFor(() => {
      expect(screen.getByText('Browse Exercises')).toBeInTheDocument();
    });
  });

  test('navigates to the workout planner page', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Workout Planner'));

    await waitFor(() => {
      expect(screen.getByText('Plan your week, Monday through Sunday.')).toBeInTheDocument();
    });
  });
});
