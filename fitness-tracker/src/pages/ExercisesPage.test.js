import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import ExercisesPage from './ExercisesPage';

const mockExercises = [
  { id: 1, name: 'Push-ups', category: 'strength', difficulty: 'beginner', sets: 3, reps: 15, muscleGroups: ['chest'] },
];

describe('ExercisesPage Async', () => {
  test('shows loading state while exercises are being fetched', () => {
    render(
      <MemoryRouter>
        <ExercisesPage exercises={[]} isLoading onSelectExercise={() => {}} />
      </MemoryRouter>
    );
    expect(screen.getByText('Loading exercises...')).toBeInTheDocument();
  });

  test('displays exercises once loaded', async () => {
    render(
      <MemoryRouter>
        <ExercisesPage exercises={mockExercises} isLoading={false} onSelectExercise={() => {}} />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText('Push-ups')).toBeInTheDocument();
    });
  });
});
