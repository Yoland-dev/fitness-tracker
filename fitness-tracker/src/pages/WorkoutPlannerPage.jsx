import PropTypes from 'prop-types';
import Header from '../components/common/Header';
import WorkoutPlanner from '../components/WorkoutPlanner/WorkoutPlanner';
import styles from './Pages.module.css';

// Thin wrapper page around the WorkoutPlanner container component.
const WorkoutPlannerPage = ({ workoutPlan, onRemoveExercise, onClearDay }) => {
  return (
    <div className={styles.page}>
      <Header title="Workout Planner" subtitle="Plan your week, Monday through Sunday." />
      <WorkoutPlanner workoutPlan={workoutPlan} onRemoveExercise={onRemoveExercise} onClearDay={onClearDay} />
    </div>
  );
};

WorkoutPlannerPage.propTypes = {
  workoutPlan: PropTypes.object.isRequired,
  onRemoveExercise: PropTypes.func.isRequired,
  onClearDay: PropTypes.func.isRequired,
};

export default WorkoutPlannerPage;
