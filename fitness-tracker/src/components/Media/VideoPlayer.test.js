import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import VideoPlayer from './VideoPlayer';

// jsdom does not implement play()/pause() - provide mocks for the test environment
beforeAll(() => {
  window.HTMLMediaElement.prototype.play = jest.fn();
  window.HTMLMediaElement.prototype.pause = jest.fn();
});

describe('VideoPlayer', () => {
  test('renders the exercise title and description', () => {
    render(<VideoPlayer videoUrl="/video.mp4" title="Push-ups" description="Form demo" />);
    expect(screen.getByText('Push-ups')).toBeInTheDocument();
    expect(screen.getByText('Form demo')).toBeInTheDocument();
  });

  test('play button calls the video play() method', () => {
    render(<VideoPlayer videoUrl="/video.mp4" title="Push-ups" />);
    fireEvent.click(screen.getByText('▶ Play'));
    expect(window.HTMLMediaElement.prototype.play).toHaveBeenCalled();
  });
});
