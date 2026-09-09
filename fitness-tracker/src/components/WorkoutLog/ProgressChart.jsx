import PropTypes from 'prop-types';
import styles from './WorkoutLog.module.css';

// Very small visual progress display: renders a bar per workout,
// scaled by total volume (sets x reps x weight).
const ProgressChart = ({ workoutHistory }) => {
  if (workoutHistory.length === 0) {
    return <p>Log a workout to see your progress chart.</p>;
  }

  const volumes = workoutHistory.map(
    (w) => (Number(w.sets) || 0) * (Number(w.reps) || 0) * (Number(w.weight) || 1)
  );
  const max = Math.max(...volumes, 1);

  return (
    <div className={styles.chart}>
      {workoutHistory.slice(-10).map((entry, index) => {
        const volume = volumes[index];
        // Inline style: dynamic bar height calculated from workout volume
        const heightPercent = Math.max((volume / max) * 100, 5);
        return (
          <div
            key={entry.id || index}
            className={styles.bar}
            style={{ height: `${heightPercent}%` }}
            title={`${entry.exerciseName}: ${volume}`}
          />
        );
      })}
    </div>
  );
};

ProgressChart.propTypes = {
  workoutHistory: PropTypes.array.isRequired,
};

export default ProgressChart;
