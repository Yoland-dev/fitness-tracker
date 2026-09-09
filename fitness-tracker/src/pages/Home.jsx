import { Link } from 'react-router-dom';
import Header from '../components/common/Header';
import AudioPlayer from '../components/Media/AudioPlayer';
import Button from '../components/UI/Button';
import { audioTracks } from '../data/exercisesData';
import styles from './Pages.module.css';

// Landing page: intro, motivational audio tracks, and a call to action.
const Home = () => {
  return (
    <div className={styles.page}>
      <Header
        title="Welcome to FitTrack"
        subtitle="Plan your workouts, log your progress, and stay motivated."
      />
      <Link to="/exercises">
        <Button>Browse Exercises</Button>
      </Link>

      <h2>Motivational Audio</h2>
      <div className={styles.heroAudio}>
        {audioTracks.map((track) => (
          <AudioPlayer
            key={track.id}
            audioUrl={track.audioUrl}
            title={track.title}
            description={track.description}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
