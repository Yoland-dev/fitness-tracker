import PropTypes from 'prop-types';
import { formatDate } from '../../utils/helpers';
import styles from './WorkoutLog.module.css';

// Displays a single logged workout entry with conditional styling
// depending on whether it has been marked completed.
const LogEntry = ({ entry }) => {
  const statusClass = entry.isCompleted ? styles.completed : styles.pending;

  return (
    <div className={`${styles.logEntry} ${statusClass}`}>
      <div>
        <strong>{entry.exerciseName}</strong>
        <div>
          {entry.sets} sets &times; {entry.reps} reps @ {entry.weight}kg
        </div>
        <small>{formatDate(entry.date)}</small>
      </div>
      <span>{entry.isCompleted ? 'Completed ✓' : 'Pending'}</span>
    </div>
  );
};

LogEntry.propTypes = {
  entry: PropTypes.shape({
    exerciseName: PropTypes.string.isRequired,
    sets: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    reps: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    weight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    date: PropTypes.string,
    isCompleted: PropTypes.bool,
  }).isRequired,
};

export default LogEntry;
