import PropTypes from 'prop-types';
import styles from './UI.module.css';
import { capitalize } from '../../utils/helpers';

// Small badge used to indicate difficulty or category on exercise cards
const Badge = ({ label, type }) => {
  // Conditional styling based on the badge type/value
  const variantClass = styles[type] || styles.category;

  return <span className={`${styles.badge} ${variantClass}`}>{capitalize(label)}</span>;
};

Badge.defaultProps = {
  type: 'category',
};

Badge.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
};

export default Badge;
