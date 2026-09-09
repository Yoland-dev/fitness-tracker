import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LogEntry from './LogEntry';

describe('LogEntry', () => {
  test('renders a completed entry with the completed label', () => {
    render(
      <LogEntry entry={{ exerciseName: 'Push-ups', sets: 3, reps: 10, weight: 5, date: '2026-01-01', isCompleted: true }} />
    );
    expect(screen.getByText('Completed ✓')).toBeInTheDocument();
  });

  test('renders a pending entry with the pending label', () => {
    render(
      <LogEntry entry={{ exerciseName: 'Squats', sets: 3, reps: 10, weight: 5, date: '2026-01-01', isCompleted: false }} />
    );
    expect(screen.getByText('Pending')).toBeInTheDocument();
  });
});
