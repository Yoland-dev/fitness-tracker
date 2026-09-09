import PropTypes from 'prop-types';
import styles from './common.module.css';

// Simple page header used at the top of individual pages.
const Header = ({ title, subtitle }) => (
  <header>
    <h1>{title}</h1>
    {subtitle && <p>{subtitle}</p>}
  </header>
);

Header.defaultProps = {
  subtitle: '',
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
};

export default Header;
