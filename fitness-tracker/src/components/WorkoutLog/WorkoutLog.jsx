import { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../UI/Button';
import LogEntry from './LogEntry';
import EmptyState from '../common/EmptyState';
import styles from './WorkoutLog.module.css';

// Form + list for logging completed workouts (sets/reps/weight) and
// showing recent history. Demonstrates complex object state and an
// onSubmit form handler.
const WorkoutLog = ({ exercises, workoutHistory, onLogWorkout }) => {
  const [currentLog, setCurrentLog] = useState({
    exerciseId: '',
    sets: '',
    reps: '',
    weight: '',
  });

  // onChange handler shared across the numeric/select inputs
  const handleFieldChange = (field) => (e) => {
    setCurrentLog({ ...currentLog, [field]: e.target.value });
  };

  // onSubmit handler for logging a completed workout
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentLog.exerciseId) return;

    const exercise = exercises.find((ex) => ex.id === parseInt(currentLog.exerciseId, 10));
    onLogWorkout({
      id: Date.now(),
      exerciseId: exercise.id,
      exerciseName: exercise.name,
      sets: currentLog.sets,
      reps: currentLog.reps,
      weight: currentLog.weight,
      date: new Date().toISOString(),
      isCompleted: true,
    });

    setCurrentLog({ exerciseId: '', sets: '', reps: '', weight: '' });
  };

  return (
    <div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <select
          className={styles.input}
          value={currentLog.exerciseId}
          onChange={handleFieldChange('exerciseId')}
          required
        >
          <option value="">Select exercise</option>
          {exercises.map((ex) => (
            <option key={ex.id} value={ex.id}>
              {ex.name}
            </option>
          ))}
        </select>
        <input
          className={styles.input}
          type="number"
          placeholder="Sets"
          value={currentLog.sets}
          onChange={handleFieldChange('sets')}
          required
        />
        <input
          className={styles.input}
          type="number"
          placeholder="Reps"
          value={currentLog.reps}
          onChange={handleFieldChange('reps')}
          required
        />
        <input
          className={styles.input}
          type="number"
          placeholder="Weight (kg)"
          value={currentLog.weight}
          onChange={handleFieldChange('weight')}
        />
        <Button type="submit">Log Workout</Button>
      </form>

      {workoutHistory.length > 0 ? (
        [...workoutHistory].reverse().map((entry) => <LogEntry key={entry.id} entry={entry} />)
      ) : (
        <EmptyState message="No workouts logged yet. Start tracking your progress!" />
      )}
    </div>
  );
};

WorkoutLog.propTypes = {
  exercises: PropTypes.array.isRequired,
  workoutHistory: PropTypes.array.isRequired,
  onLogWorkout: PropTypes.func.isRequired,
};

export default WorkoutLog;
