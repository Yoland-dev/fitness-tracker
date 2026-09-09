import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DayCard from './DayCard';

describe('DayCard', () => {
  test('shows empty message when no exercises are planned', () => {
    render(<DayCard day="monday" exercises={[]} onRemoveExercise={() => {}} onClearDay={() => {}} />);
    expect(screen.getByText('No exercises planned')).toBeInTheDocument();
  });

  test('lists planned exercises for the day', () => {
    render(
      <DayCard
        day="monday"
        exercises={[{ id: 1, name: 'Push-ups' }]}
        onRemoveExercise={() => {}}
        onClearDay={() => {}}
      />
    );
    expect(screen.getByText('Push-ups')).toBeInTheDocument();
  });

  test('calls onRemoveExercise when the remove button is clicked', () => {
    const mockRemove = jest.fn();
    render(
      <DayCard
        day="monday"
        exercises={[{ id: 1, name: 'Push-ups' }]}
        onRemoveExercise={mockRemove}
        onClearDay={() => {}}
      />
    );
    fireEvent.click(screen.getByLabelText('Remove Push-ups from monday'));
    expect(mockRemove).toHaveBeenCalledWith('monday', 0);
  });
});
