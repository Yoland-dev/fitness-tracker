import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ExerciseList from './ExerciseList';

const mockExercises = [
  { id: 1, name: 'Push-ups', category: 'strength', difficulty: 'beginner', sets: 3, reps: 15, muscleGroups: [] },
];

describe('ExerciseList Conditional Rendering', () => {
  test('shows loading state', () => {
    render(<ExerciseList exercises={[]} isLoading onSelectExercise={() => {}} />);
    expect(screen.getByText('Loading exercises...')).toBeInTheDocument();
  });

  test('shows empty state when no exercises', () => {
    render(<ExerciseList exercises={[]} isLoading={false} onSelectExercise={() => {}} />);
    expect(screen.getByText(/No exercises found/)).toBeInTheDocument();
  });

  test('shows error state on error', () => {
    render(<ExerciseList exercises={[]} error="Failed to load" onSelectExercise={() => {}} />);
    expect(screen.getByText('Failed to load')).toBeInTheDocument();
  });

  test('renders a list of exercise cards', () => {
    render(<ExerciseList exercises={mockExercises} onSelectExercise={() => {}} />);
    expect(screen.getByText('Push-ups')).toBeInTheDocument();
  });
});
