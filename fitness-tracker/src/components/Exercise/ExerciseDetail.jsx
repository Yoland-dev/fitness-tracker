import { useParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Badge from '../UI/Badge';
import Button from '../UI/Button';
import VideoPlayer from '../Media/VideoPlayer';
import { formatDuration } from '../../utils/helpers';
import styles from './Exercise.module.css';

// Full exercise detail view, reached via the dynamic /exercises/:id route.
// Demonstrates useParams, useNavigate (programmatic navigation), and
// a grandchild component (ExerciseDetail > VideoPlayer).
const ExerciseDetail = ({ exercises }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const exercise = exercises.find((e) => e.id === parseInt(id, 10));

  // Conditional rendering: entire section swapped out if not found
  if (!exercise) {
    return (
      <div className={styles.detail}>
        <p>Exercise not found.</p>
        <Button onClick={() => navigate('/exercises')}>Back to Exercises</Button>
      </div>
    );
  }

  return (
    <div className={styles.detail}>
      <Button variant="secondary" onClick={() => navigate('/exercises')}>
        ← Back to Exercises
      </Button>
      <h2>{exercise.name}</h2>
      <div className={styles.badgeRow}>
        <Badge label={exercise.difficulty} type={exercise.difficulty} />
        <Badge label={exercise.category} type="category" />
      </div>
      <p>
        {exercise.sets} sets &times; {exercise.reps} reps &mdash; {formatDuration(exercise.duration)}
      </p>
      <h3>Instructions</h3>
      <ol className={styles.instructionList}>
        {exercise.instructions.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
      <VideoPlayer
        videoUrl={exercise.videoUrl}
        title={`${exercise.name} Demonstration`}
        description="Watch proper form before attempting this exercise."
      />
    </div>
  );
};

ExerciseDetail.propTypes = {
  exercises: PropTypes.array.isRequired,
};

export default ExerciseDetail;
