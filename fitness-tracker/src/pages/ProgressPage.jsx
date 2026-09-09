import PropTypes from 'prop-types';
import Header from '../components/common/Header';
import ProgressChart from '../components/WorkoutLog/ProgressChart';
import { calculateTotalCalories, calculateStreak } from '../utils/helpers';
import styles from './Pages.module.css';

// Progress tracking page: summary stats + a small visual progress chart.
const ProgressPage = ({ workoutHistory, workoutPlan }) => {
  const totalWorkouts = workoutHistory.length;
  const totalPlannedExercises = Object.values(workoutPlan).reduce((sum, list) => sum + list.length, 0);
  const totalCalories = calculateTotalCalories(
    workoutHistory.map((h) => ({ caloriesBurn: (Number(h.sets) || 0) * (Number(h.reps) || 0) }))
  );
  const streak = calculateStreak(workoutHistory);

  return (
    <div className={styles.page}>
      <Header title="Your Progress" subtitle="A snapshot of how far you've come." />
      <div className={styles.statsRow}>
        <div className={styles.statCard}>
          <div className={styles.statValue}>{totalWorkouts}</div>
          <div>Workouts Completed</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statValue}>{totalPlannedExercises}</div>
          <div>Exercises in Plan</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statValue}>{totalCalories}</div>
          <div>Total Volume Points</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statValue}>{streak}</div>
          <div>Day Streak</div>
        </div>
      </div>
      <h2>Recent Activity</h2>
      <ProgressChart workoutHistory={workoutHistory} />
    </div>
  );
};

ProgressPage.propTypes = {
  workoutHistory: PropTypes.array.isRequired,
  workoutPlan: PropTypes.object.isRequired,
};

export default ProgressPage;
