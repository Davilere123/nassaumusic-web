// src/screens/PlaylistScreen.jsx
import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { useAudio } from '../context/AudioContext';
import { tracks } from '../mockData.js';
import './PlaylistScreen.css';

export default function PlaylistScreen({ album, goBack }) {
  const { playTrack, openPlayer } = useAudio();

  // Em caso do album não ser passado corretamente, teremos fallback
  const currentAlbum = album || { title: 'Playlist Desconhecida', image: 'https://picsum.photos/200/200' };

  const handlePlay = (item) => {
    playTrack(item); 
    openPlayer();
  };

  return (
    <div className="playlist-overlay">
      <button className="playlist-back-btn" onClick={goBack}>
        <ChevronLeft size={24} />
      </button>

      <div className="playlist-header">
        <img src={currentAlbum.image} alt="Capa" className="playlist-cover" />
        <h2 className="playlist-title">{currentAlbum.title}</h2>
        <p className="playlist-sub">Playlist • 2026</p>
      </div>

      <div className="playlist-track-list">
        {tracks.map((item) => (
          <button key={item.id} className="playlist-track-item" onClick={() => handlePlay(item)}>
            <span className="playlist-track-title">{item.title}</span>
            <span className="playlist-track-artist">{item.artist}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
