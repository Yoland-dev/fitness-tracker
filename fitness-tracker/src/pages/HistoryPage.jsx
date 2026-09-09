import PropTypes from 'prop-types';
import Header from '../components/common/Header';
import WorkoutLog from '../components/WorkoutLog/WorkoutLog';
import styles from './Pages.module.css';

// History/logging page: lets the user log a completed workout and
// review recent history.
const HistoryPage = ({ exercises, workoutHistory, onLogWorkout }) => {
  return (
    <div className={styles.page}>
      <Header title="Workout History" subtitle="Log a workout and track what you've completed." />
      <WorkoutLog exercises={exercises} workoutHistory={workoutHistory} onLogWorkout={onLogWorkout} />
    </div>
  );
};

HistoryPage.propTypes = {
  exercises: PropTypes.array.isRequired,
  workoutHistory: PropTypes.array.isRequired,
  onLogWorkout: PropTypes.func.isRequired,
};

export default HistoryPage;
