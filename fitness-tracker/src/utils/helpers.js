// Utility/helper functions shared across the application.
// Kept pure and framework-agnostic so they are easy to unit test.

// Formats a duration in minutes into a friendly display string
export function formatDuration(minutes) {
  if (!minutes && minutes !== 0) return 'N/A';
  return minutes >= 60
    ? `${Math.floor(minutes / 60)}h ${minutes % 60}m`
    : `${minutes} min`;
}

// Calculates the total weight lifted across a list of logged sets
export function calculateTotalWeight(logEntries = []) {
  return logEntries.reduce((total, entry) => {
    const sets = Number(entry.sets) || 0;
    const reps = Number(entry.reps) || 0;
    const weight = Number(entry.weight) || 0;
    return total + sets * reps * weight;
  }, 0);
}

// Calculates the total estimated calories burned for a set of exercises
export function calculateTotalCalories(exercises = []) {
  return exercises.reduce((total, ex) => total + (ex.caloriesBurn || 0), 0);
}

// Calculates a simple consecutive-day workout streak from history dates
export function calculateStreak(workoutHistory = []) {
  if (workoutHistory.length === 0) return 0;

  const uniqueDates = [...new Set(workoutHistory.map((w) => w.date))].sort(
    (a, b) => new Date(b) - new Date(a)
  );

  let streak = 1;
  for (let i = 0; i < uniqueDates.length - 1; i += 1) {
    const current = new Date(uniqueDates[i]);
    const prev = new Date(uniqueDates[i + 1]);
    const diffDays = Math.round((current - prev) / (1000 * 60 * 60 * 24));
    if (diffDays === 1) {
      streak += 1;
    } else {
      break;
    }
  }
  return streak;
}

// Filters exercises by search term, category, and difficulty
export function filterExercises(exercises, { searchTerm = '', category = 'all', difficulty = 'all', muscleGroup = 'all' }) {
  return exercises
    .filter((ex) => ex.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((ex) => category === 'all' || ex.category === category)
    .filter((ex) => difficulty === 'all' || ex.difficulty === difficulty)
    .filter((ex) => muscleGroup === 'all' || ex.muscleGroups.includes(muscleGroup));
}

// Formats a date string into a short, readable format
export function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

// Capitalizes the first letter of a string (used for category/difficulty labels)
export function capitalize(str = '') {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
