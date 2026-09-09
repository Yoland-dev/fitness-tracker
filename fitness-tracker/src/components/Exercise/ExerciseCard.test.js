import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ExerciseCard from './ExerciseCard';

describe('ExerciseCard', () => {
  const mockExercise = {
    id: 1,
    name: 'Push-ups',
    category: 'strength',
    difficulty: 'beginner',
    sets: 3,
    reps: 15,
    muscleGroups: ['chest'],
  };

  test('renders exercise name', () => {
    render(<ExerciseCard exercise={mockExercise} onSelect={() => {}} />);
    expect(screen.getByText('Push-ups')).toBeInTheDocument();
  });

  test('displays difficulty badge', () => {
    render(<ExerciseCard exercise={mockExercise} onSelect={() => {}} />);
    expect(screen.getByText('Beginner')).toBeInTheDocument();
  });

  test('calls onSelect when the card is clicked', () => {
    const mockOnSelect = jest.fn();
    render(<ExerciseCard exercise={mockExercise} onSelect={mockOnSelect} />);
    fireEvent.click(screen.getByText('Push-ups'));
    expect(mockOnSelect).toHaveBeenCalledWith(mockExercise.id);
  });

  test('calls onAdd when the Add to Plan button is clicked', () => {
    const mockOnAdd = jest.fn();
    render(<ExerciseCard exercise={mockExercise} onSelect={() => {}} onAdd={mockOnAdd} />);
    fireEvent.click(screen.getByText('Add to Plan'));
    expect(mockOnAdd).toHaveBeenCalledWith(mockExercise);
  });

  test('shows "In Plan" label when isInPlan is true', () => {
    render(<ExerciseCard exercise={mockExercise} onSelect={() => {}} onAdd={() => {}} isInPlan />);
    expect(screen.getByText('✓ In Plan')).toBeInTheDocument();
  });
});
