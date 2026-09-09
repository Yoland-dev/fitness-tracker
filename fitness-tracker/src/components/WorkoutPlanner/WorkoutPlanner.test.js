import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import WorkoutPlanner from './WorkoutPlanner';

describe('WorkoutPlanner', () => {
  test('renders a card for every day of the week', () => {
    const emptyPlan = { monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [], sunday: [] };
    render(<WorkoutPlanner workoutPlan={emptyPlan} onRemoveExercise={() => {}} onClearDay={() => {}} />);
    ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].forEach((day) => {
      expect(screen.getByText(day)).toBeInTheDocument();
    });
  });
});
