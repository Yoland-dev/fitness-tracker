import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Media.module.css';

// Exercise demonstration video player with custom play/pause controls
// in addition to the native browser controls.
const VideoPlayer = ({ videoUrl, title, description }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    videoRef.current.play();
    setIsPlaying(true);
  };

  const handlePause = () => {
    videoRef.current.pause();
    setIsPlaying(false);
  };

  return (
    <div className={styles.videoContainer}>
      <h3>{title}</h3>
      <p>{description}</p>
      <video
        ref={videoRef}
        controls
        width="100%"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
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

VideoPlayer.defaultProps = {
  description: '',
};

VideoPlayer.propTypes = {
  videoUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
};

export default VideoPlayer;
