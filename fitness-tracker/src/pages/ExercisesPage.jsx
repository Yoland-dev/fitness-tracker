import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/common/Header';
import ExerciseFilter from '../components/Exercise/ExerciseFilter';
import ExerciseList from '../components/Exercise/ExerciseList';
import { filterExercises } from '../utils/helpers';
import styles from './Pages.module.css';

// Exercise browsing page: search + filters + grid of ExerciseCards.
// Filtering state is owned locally since only this page needs it.
const ExercisesPage = ({ exercises, isLoading, onSelectExercise, onAddToWorkout, planExerciseIds }) => {
  const [filters, setFilters] = useState({
    searchTerm: '',
    category: 'all',
    difficulty: 'all',
    muscleGroup: 'all',
  });

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleClearFilters = () => {
    setFilters({ searchTerm: '', category: 'all', difficulty: 'all', muscleGroup: 'all' });
  };

  // Data transformation before passing to child: filtering happens here,
  // ExerciseList just renders whatever list it receives.
  const filteredExercises = useMemo(() => filterExercises(exercises, filters), [exercises, filters]);

  return (
    <div className={styles.page}>
      <Header title="Browse Exercises" subtitle={`${filteredExercises.length} exercises found`} />
      <ExerciseFilter filters={filters} onFilterChange={handleFilterChange} onClearFilters={handleClearFilters} />
      <ExerciseList
        exercises={filteredExercises}
        isLoading={isLoading}
        onSelectExercise={onSelectExercise}
        onAddToWorkout={onAddToWorkout}
        planExerciseIds={planExerciseIds}
      />
    </div>
  );
};

ExercisesPage.defaultProps = {
  isLoading: false,
  onAddToWorkout: null,
  planExerciseIds: [],
};

ExercisesPage.propTypes = {
  exercises: PropTypes.array.isRequired,
  isLoading: PropTypes.bool,
  onSelectExercise: PropTypes.func.isRequired,
  onAddToWorkout: PropTypes.func,
  planExerciseIds: PropTypes.array,
};

export default ExercisesPage;
