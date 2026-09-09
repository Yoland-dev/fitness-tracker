import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Modal from './Modal';

describe('Modal', () => {
  test('renders title and children content', () => {
    render(
      <Modal title="Details" onClose={() => {}}>
        <p>Modal body</p>
      </Modal>
    );
    expect(screen.getByText('Details')).toBeInTheDocument();
    expect(screen.getByText('Modal body')).toBeInTheDocument();
  });

  test('calls onClose when the close button is clicked', () => {
    const mockClose = jest.fn();
    render(
      <Modal onClose={mockClose}>
        <p>Content</p>
      </Modal>
    );
    fireEvent.click(screen.getByLabelText('Close modal'));
    expect(mockClose).toHaveBeenCalled();
  });

  test('calls onClose when clicking the overlay', () => {
    const mockClose = jest.fn();
    render(
      <Modal onClose={mockClose}>
        <p>Content</p>
      </Modal>
    );
    fireEvent.click(screen.getByText('Content').closest('.modalOverlay') || screen.getByText('Content').parentElement.parentElement);
    expect(mockClose).toHaveBeenCalled();
  });
});
