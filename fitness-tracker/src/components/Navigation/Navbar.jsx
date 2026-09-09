import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';

// Primary navigation bar. Highlights the active route and collapses
// into a hamburger menu on smaller (mobile) screens.
const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const routes = [
    { path: '/', label: 'Home' },
    { path: '/exercises', label: 'Exercises' },
    { path: '/workout-planner', label: 'Workout Planner' },
    { path: '/history', label: 'History' },
    { path: '/progress', label: 'Progress' },
  ];

  // Determine active-link styling based on the current pathname
  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.brand}>
        FitTrack
      </Link>
      <button className={styles.hamburger} onClick={toggleMenu} aria-label="Toggle navigation">
        ☰
      </button>
      <ul className={`${styles.links} ${isOpen ? styles.linksOpen : ''}`}>
        {routes.map((route) => (
          <li key={route.path}>
            <Link
              to={route.path}
              className={isActive(route.path) ? `${styles.link} ${styles.active}` : styles.link}
              onClick={() => setIsOpen(false)}
            >
              {route.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
