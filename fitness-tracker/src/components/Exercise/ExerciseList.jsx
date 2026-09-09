import PropTypes from 'prop-types';
import ExerciseCard from './ExerciseCard';
import Loading from '../common/Loading';
import EmptyState from '../common/EmptyState';
import styles from './Exercise.module.css';

// Renders a grid of ExerciseCards, handling loading/empty/error states.
const ExerciseList = ({ exercises, isLoading, error, onSelectExercise, onAddToWorkout, planExerciseIds }) => {
  // Ternary: loading state takes priority over everything else
  if (isLoading) {
    return <Loading message="Loading exercises..." />;
  }

  // && operator: show an error banner only when an error is present
  return (
    <div>
      {error && <div role="alert">{error}</div>}
      {exercises.length === 0 ? (
        <EmptyState message="No exercises found. Try adjusting your filters." />
      ) : (
        <div className={styles.grid}>
          {exercises.map((exercise) => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              onSelect={onSelectExercise}
              onAdd={onAddToWorkout}
              isInPlan={planExerciseIds.includes(exercise.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

ExerciseList.defaultProps = {
  isLoading: false,
  error: '',
  onAddToWorkout: null,
  planExerciseIds: [],
};

ExerciseList.propTypes = {
  exercises: PropTypes.array.isRequired,
  isLoading: PropTypes.bool,
  error: PropTypes.string,
  onSelectExercise: PropTypes.func.isRequired,
  onAddToWorkout: PropTypes.func,
  planExerciseIds: PropTypes.array,
};

export default ExerciseList;
