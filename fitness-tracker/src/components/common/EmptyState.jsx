import PropTypes from 'prop-types';
import styles from './common.module.css';

// Generic empty-state message shown when a list has no data.
const EmptyState = ({ message }) => (
  <div className={styles.emptyState}>
    <p>{message}</p>
  </div>
);

EmptyState.defaultProps = {
  message: 'Nothing here yet.',
};

EmptyState.propTypes = {
  message: PropTypes.string,
};

export default EmptyState;
