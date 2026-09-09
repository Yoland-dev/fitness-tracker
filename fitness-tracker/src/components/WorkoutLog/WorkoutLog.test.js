import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import WorkoutLog from './WorkoutLog';

const mockExercises = [{ id: 1, name: 'Push-ups' }];

describe('WorkoutLog', () => {
  test('shows empty state when there is no history', () => {
    render(<WorkoutLog exercises={mockExercises} workoutHistory={[]} onLogWorkout={() => {}} />);
    expect(screen.getByText(/No workouts logged yet/)).toBeInTheDocument();
  });

  test('calls onLogWorkout with form data on submit', () => {
    const mockLog = jest.fn();
    render(<WorkoutLog exercises={mockExercises} workoutHistory={[]} onLogWorkout={mockLog} />);

    fireEvent.change(screen.getByDisplayValue('Select exercise'), { target: { value: '1' } });
    fireEvent.change(screen.getByPlaceholderText('Sets'), { target: { value: '3' } });
    fireEvent.change(screen.getByPlaceholderText('Reps'), { target: { value: '10' } });
    fireEvent.click(screen.getByText('Log Workout'));

    expect(mockLog).toHaveBeenCalled();
    expect(mockLog.mock.calls[0][0].exerciseName).toBe('Push-ups');
  });

  test('renders history entries when present', () => {
    render(
      <WorkoutLog
        exercises={mockExercises}
        workoutHistory={[{ id: 1, exerciseName: 'Push-ups', sets: 3, reps: 10, weight: 0, date: '2026-01-01', isCompleted: true }]}
        onLogWorkout={() => {}}
      />
    );
    expect(screen.getAllByText('Push-ups').length).toBeGreaterThan(0);
    expect(screen.getByText('Completed ✓')).toBeInTheDocument();
  });
});
