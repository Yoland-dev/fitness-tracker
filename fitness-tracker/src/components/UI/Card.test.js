import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Card from './Card';

describe('Card', () => {
  test('renders children content', () => {
    render(<Card><p>Hello World</p></Card>);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  test('calls onClick when clicked', () => {
    const mockOnClick = jest.fn();
    render(<Card onClick={mockOnClick}><p>Clickable</p></Card>);
    fireEvent.click(screen.getByText('Clickable'));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  test('applies selected styling when isSelected is true', () => {
    render(<Card isSelected><p>Selected</p></Card>);
    expect(screen.getByText('Selected').parentElement.className).toMatch(/selected/);
  });
});
