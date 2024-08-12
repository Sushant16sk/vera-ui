import React, { useState, useEffect, useRef } from 'react';
import './userplayer.css';

const UserPlayer = ({ audioUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const audioRef = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        const currentTime = audioRef.current.currentTime;
        setCurrentTime(currentTime);
        const duration = audioRef.current.duration;
        setDuration(duration);
        setProgress((currentTime / duration) * 100);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleProgressBarClick = (e) => {
    const progressBar = e.currentTarget;
    const clickX = e.clientX - progressBar.getBoundingClientRect().left;
    const newProgress = (clickX / progressBar.clientWidth) * 100;
    const newTime = (newProgress / 100) * audioRef.current.duration;
    audioRef.current.currentTime = newTime;
    setProgress(newProgress);
  };

  const togglePlaybackRate = () => {
    const rates = [0.5, 1, 2];
    const nextRate = rates[(rates.indexOf(playbackRate) + 1) % rates.length];
    setPlaybackRate(nextRate);
  };

  return (
    <div className="user-bubble">
      <div className="audio-player">
        <audio
          ref={audioRef}
          src={audioUrl}
          onEnded={() => setIsPlaying(false)}
          onError={(e) => {
            console.error('Error loading audio:', e);
            setIsPlaying(false);
          }}
        />
        <div className="audio-controls">
          <div className="play-pause-button" onClick={togglePlayPause}>
            {isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="#9a9a9a" viewBox="0 0 24 24" width="24px" height="24px">
                <path d="M6 19h4.5V5H6v14zm7.5 0H18V5h-4.5v14z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="#9a9a9a" viewBox="0 0 24 24" width="24px" height="24px">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </div>
          <div className="progress-container">
            <div className="progress-bar" style={{ background: '#d3d3d3' }} onClick={handleProgressBarClick}>
              <div className="progress" style={{ width: `${progress}%`, background: 'black' }}></div>
            </div>
            <span className="duration">{formatTime(currentTime)} / {formatTime(duration)}</span>
          </div>
          <button
            className="playback-rate-button"
            onClick={togglePlaybackRate}
            style={{ 
              borderLeft: '2px solid #9a9a9a'
            }}
          >
            {playbackRate}x
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserPlayer;