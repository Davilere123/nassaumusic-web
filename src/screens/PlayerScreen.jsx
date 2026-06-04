// src/screens/PlayerScreen.jsx
import React from 'react';
import { ChevronDown, Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import { useAudio } from '../context/AudioContext';
import './PlayerScreen.css';

export default function PlayerScreen() {
  const {
    currentTrack,
    isPlaying,
    togglePlayPause,
    positionMs,
    durationMs,
    seekTo,
    playNext,
    playPrevious,
    isPlayerOpen,
    closePlayer
  } = useAudio();

  const formatTime = (millis) => {
    if (!millis || isNaN(millis)) return "0:00";
    const totalSeconds = Math.floor(millis / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  if (!currentTrack || !isPlayerOpen) return null;

  return (
    <div className="player-overlay">
      <div className="player-modal-content">
        <button className="player-close-btn" onClick={closePlayer}>
          <ChevronDown size={30} />
        </button>

        <img src={currentTrack.capa || currentTrack.artwork} alt="Cover" className="player-art" />

        <div className="player-info-container">
          <h2 className="player-title">{currentTrack.titulo || currentTrack.title}</h2>
          <h3 className="player-artist">{currentTrack.artista || currentTrack.artist}</h3>
        </div>

        <div className="player-slider-container">
          <input
            type="range"
            className="player-slider"
            min={0}
            max={durationMs || 100}
            value={positionMs}
            onChange={(e) => seekTo(Number(e.target.value))}
          />
          <div className="player-time-container">
            <span className="player-time-text">{formatTime(positionMs)}</span>
            <span className="player-time-text">{formatTime(durationMs)}</span>
          </div>
        </div>

        <div className="player-controls">
          <button className="player-ctrl-btn" onClick={playPrevious}>
            <SkipBack size={38} fill="#fff" color="#fff" />
          </button>

          <button className="player-ctrl-btn" onClick={togglePlayPause}>
            {isPlaying ? (
              <Pause size={80} color="#9333ea" fill="#9333ea" />
            ) : (
              <Play size={80} color="#9333ea" fill="#9333ea" />
            )}
          </button>

          <button className="player-ctrl-btn" onClick={playNext}>
            <SkipForward size={38} fill="#fff" color="#fff" />
          </button>
        </div>
      </div>
    </div>
  );
}
