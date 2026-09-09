import styles from './common.module.css';

// Application footer, shown on every page.
const Footer = () => (
  <footer className={styles.footer}>
    <p>&copy; {new Date().getFullYear()} FitTrack. Built to help you reach your goals.</p>
  </footer>
);

export default Footer;
