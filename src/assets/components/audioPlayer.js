import React, { useState, useEffect, useRef } from 'react';
import './AudioPlayer.css';

const AudioPlayer = ({ audioUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        const duration = audioRef.current.duration;
        const currentTime = audioRef.current.currentTime;
        setProgress((currentTime / duration) * 100);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="chat-bubble">
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
                <path d="M6 19h4.5V5H6v14zm7.5 0H18V5h-4.5v14z"/>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="#9a9a9a" viewBox="0 0 24 24" width="24px" height="24px">
                <path d="M8 5v14l11-7z"/>
              </svg>
            )}
          </div>
          <div className="progress-container">
            <div className="progress-bar">
              <div className="progress" style={{ width: `${progress}%` }}></div>
            </div>
            <span className="duration">{audioRef.current?.duration ? Math.floor(audioRef.current.duration) : '0'}s</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;