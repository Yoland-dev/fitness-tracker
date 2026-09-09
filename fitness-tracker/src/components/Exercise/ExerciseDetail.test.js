import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import '@testing-library/jest-dom';
import ExerciseDetail from './ExerciseDetail';

const mockExercises = [
  {
    id: 1,
    name: 'Push-ups',
    category: 'strength',
    difficulty: 'beginner',
    sets: 3,
    reps: 15,
    duration: 10,
    instructions: ['Step one', 'Step two'],
    videoUrl: '/video.mp4',
  },
];

beforeAll(() => {
  window.HTMLMediaElement.prototype.play = jest.fn();
  window.HTMLMediaElement.prototype.pause = jest.fn();
});

const renderWithRoute = (id) =>
  render(
    <MemoryRouter initialEntries={[`/exercises/${id}`]}>
      <Routes>
        <Route path="/exercises/:id" element={<ExerciseDetail exercises={mockExercises} />} />
      </Routes>
    </MemoryRouter>
  );

describe('ExerciseDetail', () => {
  test('renders exercise details and instructions', () => {
    renderWithRoute(1);
    expect(screen.getByText('Push-ups')).toBeInTheDocument();
    expect(screen.getByText('Step one')).toBeInTheDocument();
  });

  test('shows a not-found message for an invalid id', () => {
    renderWithRoute(999);
    expect(screen.getByText('Exercise not found.')).toBeInTheDocument();
  });

  test('back button is rendered and clickable without throwing', () => {
    renderWithRoute(999);
    const backButton = screen.getByText('Back to Exercises');
    expect(() => fireEvent.click(backButton)).not.toThrow();
  });
});
