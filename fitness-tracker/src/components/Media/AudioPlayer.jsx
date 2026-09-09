import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Media.module.css';

// Motivational audio track player with play/pause controls.
const AudioPlayer = ({ audioUrl, title, description }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    audioRef.current.play();
    setIsPlaying(true);
  };

  const handlePause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  return (
    <div className={styles.audioContainer}>
      <h4>{title}</h4>
      <p>{description}</p>
      <audio ref={audioRef} controls onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)}>
        <source src={audioUrl} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <div className={styles.controls}>
        <button className={styles.mediaButton} onClick={handlePlay} disabled={isPlaying}>
          ▶ Play
        </button>
        <button className={styles.mediaButton} onClick={handlePause} disabled={!isPlaying}>
          ⏸ Pause
        </button>
      </div>
    </div>
  );
};

AudioPlayer.defaultProps = {
  description: '',
};

AudioPlayer.propTypes = {
  audioUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
};

export default AudioPlayer;
