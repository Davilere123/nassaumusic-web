/**
 * MiniPlayer.jsx
 * 
 * O widget de música fixo que aparece na parte inferior (acima da navegação).
 * Sincronizado diretamente com o AudioContext para exibir o status atual da música global.
 */

import React from 'react';
import { Play, Pause } from 'lucide-react';
import { useAudio } from '../context/AudioContext';
import './MiniPlayer.css';

export default function MiniPlayer() {
  const { currentTrack, isPlaying, togglePlayPause, positionMs, isPlayerOpen, openPlayer } = useAudio();

  const formatTime = (millis) => {
    if (!millis || isNaN(millis)) return "0:00";
    const totalSeconds = Math.floor(millis / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  if (!currentTrack) return null;
  if (isPlayerOpen) return null;

  return (
    <div className="miniplayer-container" onClick={openPlayer}>
      <img src={currentTrack.capa || currentTrack.artwork} alt="Cover" className="mini-art" />
      <div className="mini-info">
        <span className="mini-title">{currentTrack.titulo || currentTrack.title}</span>
        <span className="mini-artist">{currentTrack.artista || currentTrack.artist}</span>
        <span className="mini-time">{formatTime(positionMs)}</span>
      </div>

      <button
        className="mini-play-btn"
        onClick={(e) => {
          e.stopPropagation(); // Evita abrir o player ao clicar no play
          togglePlayPause();
        }}
      >
        {isPlaying ? <Pause size={28} fill="#fff" color="#fff" /> : <Play size={28} fill="#fff" color="#fff" />}
      </button>
    </div>
  );
}
