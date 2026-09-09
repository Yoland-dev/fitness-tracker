import PropTypes from 'prop-types';
import styles from './UI.module.css';

// Reusable Modal that renders arbitrary children (composition pattern).
const Modal = ({ children, onClose, title }) => {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      {/* Stop propagation so clicking inside the modal doesn't close it */}
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.modalClose} onClick={onClose} aria-label="Close modal">
          ✕
        </button>
        {title && <h2>{title}</h2>}
        {children}
      </div>
    </div>
  );
};

Modal.defaultProps = {
  title: '',
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
};

export default Modal;
