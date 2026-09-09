import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import SearchBar from './SearchBar';

describe('SearchBar User Interactions', () => {
  test('calls onSearch as the user types', async () => {
    const mockOnSearch = jest.fn();
    render(<SearchBar onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText('Search exercises...');
    await userEvent.type(input, 'push');
    expect(mockOnSearch).toHaveBeenCalled();
    expect(input.value).toBe('push');
  });

  test('clears search on clear button click', () => {
    const mockOnClear = jest.fn();
    render(<SearchBar onSearch={() => {}} onClear={mockOnClear} searchTerm="test" />);
    fireEvent.click(screen.getByText('Clear'));
    expect(mockOnClear).toHaveBeenCalled();
  });

  test('submits the form without reloading the page', () => {
    const mockOnSearch = jest.fn();
    render(<SearchBar onSearch={mockOnSearch} searchTerm="squats" />);
    const form = screen.getByPlaceholderText('Search exercises...').closest('form');
    fireEvent.submit(form);
    expect(mockOnSearch).toHaveBeenCalledWith('squats');
  });
});
