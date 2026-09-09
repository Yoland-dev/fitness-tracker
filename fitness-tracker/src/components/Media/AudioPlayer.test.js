import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AudioPlayer from './AudioPlayer';

beforeAll(() => {
  window.HTMLMediaElement.prototype.play = jest.fn();
  window.HTMLMediaElement.prototype.pause = jest.fn();
});

describe('AudioPlayer', () => {
  test('renders the track title', () => {
    render(<AudioPlayer audioUrl="/track.mp3" title="Morning Motivation" />);
    expect(screen.getByText('Morning Motivation')).toBeInTheDocument();
  });

  test('pause button calls the audio pause() method after playing', () => {
    render(<AudioPlayer audioUrl="/track.mp3" title="Morning Motivation" />);
    fireEvent.click(screen.getByText('▶ Play'));
    fireEvent.click(screen.getByText('⏸ Pause'));
    expect(window.HTMLMediaElement.prototype.pause).toHaveBeenCalled();
  });
});
