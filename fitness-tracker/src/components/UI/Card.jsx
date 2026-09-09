import PropTypes from 'prop-types';
import styles from './UI.module.css';

// Generic Card container. Demonstrates the children/composition pattern
// so any content can be dropped inside a consistently-styled card.
const Card = ({ children, isSelected, onClick }) => {
  return (
    <div
      className={`${styles.card} ${isSelected ? styles.selected : ''}`}
      onClick={onClick}
      // Inline style: dynamic cursor based on whether the card is clickable
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      {children}
    </div>
  );
};

Card.defaultProps = {
  isSelected: false,
  onClick: null,
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  isSelected: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Card;
