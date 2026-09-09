import PropTypes from 'prop-types';
import Card from '../UI/Card';
import Button from '../UI/Button';
import { capitalize } from '../../utils/helpers';
import styles from './WorkoutPlanner.module.css';

// Represents a single day in the weekly planner. Reused 7 times by
// WorkoutPlanner, once per day of the week.
const DayCard = ({ day, exercises, onRemoveExercise, onClearDay }) => {
  return (
    <Card>
      <h3 className={styles.dayTitle}>{capitalize(day)}</h3>
      {exercises.length > 0 ? (
        <>
          {exercises.map((exercise, index) => (
            <div className={styles.exerciseItem} key={`${exercise.id}-${index}`}>
              <span>{exercise.name}</span>
              <button
                className={styles.removeBtn}
                onClick={() => onRemoveExercise(day, index)}
                aria-label={`Remove ${exercise.name} from ${day}`}
              >
                ✕
              </button>
            </div>
          ))}
          {exercises.length > 0 && (
            <Button variant="secondary" onClick={() => onClearDay(day)}>
              Clear Day
            </Button>
          )}
        </>
      ) : (
        <p className={styles.emptyDay}>No exercises planned</p>
      )}
    </Card>
  );
};

DayCard.propTypes = {
  day: PropTypes.string.isRequired,
  exercises: PropTypes.array.isRequired,
  onRemoveExercise: PropTypes.func.isRequired,
  onClearDay: PropTypes.func.isRequired,
};

export default DayCard;
