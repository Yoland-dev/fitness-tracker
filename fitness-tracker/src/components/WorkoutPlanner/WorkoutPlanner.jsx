import PropTypes from 'prop-types';
import DayCard from './DayCard';
import { daysOfWeek } from '../../data/exercisesData';
import styles from './WorkoutPlanner.module.css';

// Main container for the weekly workout planner. Renders a DayCard for
// each day of the week (map used for list rendering) and passes down
// the shared workoutPlan state along with callback handlers.
const WorkoutPlanner = ({ workoutPlan, onRemoveExercise, onClearDay }) => {
  return (
    <div className={styles.plannerGrid}>
      {daysOfWeek.map((day) => (
        <DayCard
          key={day}
          day={day}
          exercises={workoutPlan[day] || []}
          onRemoveExercise={onRemoveExercise}
          onClearDay={onClearDay}
        />
      ))}
    </div>
  );
};

WorkoutPlanner.propTypes = {
  workoutPlan: PropTypes.object.isRequired,
  onRemoveExercise: PropTypes.func.isRequired,
  onClearDay: PropTypes.func.isRequired,
};

export default WorkoutPlanner;
