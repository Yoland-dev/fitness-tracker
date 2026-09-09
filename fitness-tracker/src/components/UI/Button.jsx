import PropTypes from 'prop-types';
import styles from './UI.module.css';

// Reusable Button component. Supports variant styling (primary/secondary/danger)
// and can be used for both regular clicks and form submission.
const Button = ({ children, onClick, variant, type, disabled }) => {
  // Conditional styling: className built from a variant lookup
  const variantClass = styles[variant] || styles.primary;

  return (
    <button
      type={type}
      className={`${styles.button} ${variantClass}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

// Default props for optional values
Button.defaultProps = {
  onClick: () => {},
  variant: 'primary',
  type: 'button',
  disabled: false,
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger']),
  type: PropTypes.oneOf(['button', 'submit']),
  disabled: PropTypes.bool,
};

export default Button;
