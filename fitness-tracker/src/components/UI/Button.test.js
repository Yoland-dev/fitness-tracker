import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from './Button';

describe('Button', () => {
  test('renders children text', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  test('calls onClick handler when clicked', () => {
    const mockOnClick = jest.fn();
    render(<Button onClick={mockOnClick}>Click Me</Button>);
    fireEvent.click(screen.getByText('Click Me'));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  test('calls onSubmit when used inside a form', () => {
    const mockOnSubmit = jest.fn((e) => e.preventDefault());
    render(
      <form onSubmit={mockOnSubmit}>
        <Button type="submit">Submit</Button>
      </form>
    );
    fireEvent.click(screen.getByText('Submit'));
    expect(mockOnSubmit).toHaveBeenCalled();
  });

  test('applies the danger variant class', () => {
    render(<Button variant="danger">Delete</Button>);
    expect(screen.getByText('Delete').className).toMatch(/danger/);
  });

  test('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByText('Disabled')).toBeDisabled();
  });
});
