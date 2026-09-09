import PropTypes from 'prop-types';
import Card from '../UI/Card';
import Badge from '../UI/Badge';
import Button from '../UI/Button';
import styles from './Exercise.module.css';

// Displays a single exercise summary. Receives data via props from
// ExerciseList (parent-to-child data flow) and reports selections/adds
// back up via callback props (child-to-parent communication).
const ExerciseCard = ({ exercise, onSelect, onAdd, isInPlan }) => {
  return (
    <Card onClick={() => onSelect(exercise.id)}>
      <h3 className={styles.cardTitle}>{exercise.name}</h3>
      <p className={styles.cardMeta}>
        {exercise.sets} sets &times; {exercise.reps} reps
      </p>
      <div className={styles.badgeRow}>
        <Badge label={exercise.difficulty} type={exercise.difficulty} />
        <Badge label={exercise.category} type="category" />
      </div>
      {onAdd && (
        <Button
          variant={isInPlan ? 'secondary' : 'primary'}
          onClick={(e) => {
            e.stopPropagation();
            onAdd(exercise);
          }}
        >
          {isInPlan ? '✓ In Plan' : 'Add to Plan'}
        </Button>
      )}
    </Card>
  );
};

ExerciseCard.defaultProps = {
  onAdd: null,
  isInPlan: false,
};

ExerciseCard.propTypes = {
  exercise: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    muscleGroups: PropTypes.arrayOf(PropTypes.string),
    difficulty: PropTypes.string,
    sets: PropTypes.number,
    reps: PropTypes.number,
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
  onAdd: PropTypes.func,
  isInPlan: PropTypes.bool,
};

export default ExerciseCard;
