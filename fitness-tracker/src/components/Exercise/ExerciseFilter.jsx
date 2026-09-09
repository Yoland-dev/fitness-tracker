import PropTypes from 'prop-types';
import SearchBar from '../UI/SearchBar';
import Button from '../UI/Button';
import styles from './Exercise.module.css';

// Filter controls for the exercise browser: search, category, difficulty,
// muscle group, plus a clear-filters button.
const ExerciseFilter = ({ filters, onFilterChange, onClearFilters }) => {
  const { searchTerm, category, difficulty, muscleGroup } = filters;

  return (
    <div className={styles.filterBar}>
      <SearchBar
        searchTerm={searchTerm}
        onSearch={(value) => onFilterChange('searchTerm', value)}
        onClear={() => onFilterChange('searchTerm', '')}
      />
      <select
        className={styles.select}
        value={category}
        onChange={(e) => onFilterChange('category', e.target.value)}
      >
        <option value="all">All Categories</option>
        <option value="strength">Strength</option>
        <option value="cardio">Cardio</option>
        <option value="flexibility">Flexibility</option>
        <option value="balance">Balance</option>
      </select>
      <select
        className={styles.select}
        value={difficulty}
        onChange={(e) => onFilterChange('difficulty', e.target.value)}
      >
        <option value="all">All Difficulties</option>
        <option value="beginner">Beginner</option>
        <option value="intermediate">Intermediate</option>
        <option value="advanced">Advanced</option>
      </select>
      <select
        className={styles.select}
        value={muscleGroup}
        onChange={(e) => onFilterChange('muscleGroup', e.target.value)}
      >
        <option value="all">All Muscle Groups</option>
        <option value="chest">Chest</option>
        <option value="back">Back</option>
        <option value="shoulders">Shoulders</option>
        <option value="arms">Arms</option>
        <option value="core">Core</option>
        <option value="legs">Legs</option>
      </select>
      <Button variant="secondary" onClick={onClearFilters}>
        Clear Filters
      </Button>
    </div>
  );
};

ExerciseFilter.propTypes = {
  filters: PropTypes.shape({
    searchTerm: PropTypes.string,
    category: PropTypes.string,
    difficulty: PropTypes.string,
    muscleGroup: PropTypes.string,
  }).isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onClearFilters: PropTypes.func.isRequired,
};

export default ExerciseFilter;
