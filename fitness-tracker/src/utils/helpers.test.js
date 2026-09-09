import {
  formatDuration,
  calculateTotalWeight,
  calculateTotalCalories,
  calculateStreak,
  filterExercises,
  capitalize,
} from './helpers';

describe('helpers', () => {
  test('formatDuration formats minutes under an hour', () => {
    expect(formatDuration(10)).toBe('10 min');
  });

  test('formatDuration formats minutes over an hour', () => {
    expect(formatDuration(90)).toBe('1h 30m');
  });

  test('calculateTotalWeight sums sets x reps x weight', () => {
    const entries = [{ sets: 3, reps: 10, weight: 5 }];
    expect(calculateTotalWeight(entries)).toBe(150);
  });

  test('calculateTotalCalories sums calories across exercises', () => {
    const exercises = [{ caloriesBurn: 50 }, { caloriesBurn: 30 }];
    expect(calculateTotalCalories(exercises)).toBe(80);
  });

  test('calculateStreak returns 0 for empty history', () => {
    expect(calculateStreak([])).toBe(0);
  });

  test('filterExercises filters by category', () => {
    const exercises = [
      { name: 'Push-ups', category: 'strength', difficulty: 'beginner', muscleGroups: ['chest'] },
      { name: 'Jumping Jacks', category: 'cardio', difficulty: 'beginner', muscleGroups: ['legs'] },
    ];
    const result = filterExercises(exercises, { category: 'cardio' });
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Jumping Jacks');
  });

  test('capitalize capitalizes the first letter', () => {
    expect(capitalize('beginner')).toBe('Beginner');
  });
});
