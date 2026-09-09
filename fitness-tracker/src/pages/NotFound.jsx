import { useNavigate } from 'react-router-dom';
import Button from '../components/UI/Button';
import styles from './Pages.module.css';

// 404 page shown for any unmatched route.
const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.notFound}>
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <Button onClick={() => navigate('/')}>Go Home</Button>
    </div>
  );
};

export default NotFound;
