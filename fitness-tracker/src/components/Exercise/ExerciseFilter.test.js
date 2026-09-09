import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ExerciseFilter from './ExerciseFilter';

const defaultFilters = { searchTerm: '', category: 'all', difficulty: 'all', muscleGroup: 'all' };

describe('ExerciseFilter', () => {
  test('calls onFilterChange when category is changed', () => {
    const mockChange = jest.fn();
    render(<ExerciseFilter filters={defaultFilters} onFilterChange={mockChange} onClearFilters={() => {}} />);
    fireEvent.change(screen.getByDisplayValue('All Categories'), { target: { value: 'cardio' } });
    expect(mockChange).toHaveBeenCalledWith('category', 'cardio');
  });

  test('calls onClearFilters when the clear button is clicked', () => {
    const mockClear = jest.fn();
    render(<ExerciseFilter filters={defaultFilters} onFilterChange={() => {}} onClearFilters={mockClear} />);
    fireEvent.click(screen.getByText('Clear Filters'));
    expect(mockClear).toHaveBeenCalled();
  });
});
