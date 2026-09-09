import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import App from '../../App';

describe('Workout Flow Integration', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  test('user can browse to exercises and add one to the workout plan', async () => {
    render(
      <MemoryRouter initialEntries={['/exercises']}>
        <App />
      </MemoryRouter>
    );

    // Wait for exercises to finish loading
    await waitFor(() => {
      expect(screen.getByText('Push-ups')).toBeInTheDocument();
    });

    // Add the first exercise (Push-ups) to the plan
    const addButtons = screen.getAllByText('Add to Plan');
    fireEvent.click(addButtons[0]);

    // Navigate to the workout planner via the nav bar
    fireEvent.click(screen.getByText('Workout Planner'));

    await waitFor(() => {
      expect(screen.getByText('Push-ups')).toBeInTheDocument();
    });
  });

  test('user can log a workout and see it reflected on the progress page', async () => {
    render(
      <MemoryRouter initialEntries={['/history']}>
        <App />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByDisplayValue('Select exercise')).toBeInTheDocument();
    });

    fireEvent.change(screen.getByDisplayValue('Select exercise'), { target: { value: '1' } });
    fireEvent.change(screen.getByPlaceholderText('Sets'), { target: { value: '3' } });
    fireEvent.change(screen.getByPlaceholderText('Reps'), { target: { value: '10' } });
    fireEvent.click(screen.getByText('Log Workout'));

    fireEvent.click(screen.getByText('Progress'));

    await waitFor(() => {
      expect(screen.getByText('Workouts Completed')).toBeInTheDocument();
    });
  });
});
