import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProgressChart from './ProgressChart';

describe('ProgressChart', () => {
  test('shows a placeholder message when there is no history', () => {
    render(<ProgressChart workoutHistory={[]} />);
    expect(screen.getByText(/Log a workout to see your progress chart/)).toBeInTheDocument();
  });

  test('renders a bar for each recent workout', () => {
    const history = [
      { id: 1, exerciseName: 'Push-ups', sets: 3, reps: 10, weight: 5 },
      { id: 2, exerciseName: 'Squats', sets: 3, reps: 12, weight: 8 },
    ];
    const { container } = render(<ProgressChart workoutHistory={history} />);
    expect(container.querySelectorAll('.bar').length).toBe(2);
  });
});
