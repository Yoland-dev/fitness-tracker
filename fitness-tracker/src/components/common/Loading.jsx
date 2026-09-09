import PropTypes from 'prop-types';
import styles from './common.module.css';

// Loading spinner shown while data operations are in progress.
const Loading = ({ message }) => (
  <div className={styles.loading}>
    <div className={styles.spinner} />
    <p>{message}</p>
  </div>
);

Loading.defaultProps = {
  message: 'Loading...',
};

Loading.propTypes = {
  message: PropTypes.string,
};

export default Loading;
