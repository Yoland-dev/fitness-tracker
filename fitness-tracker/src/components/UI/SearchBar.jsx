import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './UI.module.css';

// Controlled search input with a form submit and a clear button.
const SearchBar = ({ onSearch, onClear, searchTerm, placeholder }) => {
  const [localValue, setLocalValue] = useState(searchTerm);

  // onChange handler: accesses the event object (e.target.value)
  const handleChange = (e) => {
    setLocalValue(e.target.value);
    onSearch(e.target.value);
  };

  // onSubmit handler: prevents default page reload on form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(localValue);
  };

  const handleClear = () => {
    setLocalValue('');
    onClear();
  };

  return (
    <form className={styles.searchBar} onSubmit={handleSubmit}>
      <input
        type="text"
        className={styles.searchInput}
        placeholder={placeholder}
        value={localValue}
        onChange={handleChange}
        onFocus={(e) => e.target.style.borderColor = '#007bff'}
      />
      <button type="submit" style={{ display: 'none' }} aria-hidden="true" />
      {localValue && (
        <button type="button" onClick={handleClear}>
          Clear
        </button>
      )}
    </form>
  );
};

SearchBar.defaultProps = {
  searchTerm: '',
  placeholder: 'Search exercises...',
  onClear: () => {},
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  onClear: PropTypes.func,
  searchTerm: PropTypes.string,
  placeholder: PropTypes.string,
};

export default SearchBar;
