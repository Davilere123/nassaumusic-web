// src/screens/SearchScreen.jsx
import React, { useState } from 'react';
import './SearchScreen.css';
import { recommendedAlbums, tracks } from '../mockData.js';
import { useAudio } from '../context/AudioContext';

export default function SearchScreen({ navigate }) {
  const [query, setQuery] = useState('');
  const { playTrack, openPlayer, musicas } = useAudio();
  
  const colors = ['#E8115B', '#148A08', '#BC5900', '#777777'];

  const streamingResults = query ? tracks.filter(t => t.title.toLowerCase().includes(query.toLowerCase()) || t.artist.toLowerCase().includes(query.toLowerCase())) : [];
  const offlineResults = query ? musicas.filter(t => t.titulo.toLowerCase().includes(query.toLowerCase()) || (t.artista && t.artista.toLowerCase().includes(query.toLowerCase()))) : [];

  const showResults = query.length > 0;
  const noResults = showResults && streamingResults.length === 0 && offlineResults.length === 0;

  const handlePlay = (item, isOffline = false) => {
    playTrack(item, isOffline ? musicas : tracks);
    openPlayer();
  };

  return (
    <div className="search-container">
      <h1 className="search-header">Buscar</h1>
      <input 
        className="search-input" 
        placeholder="O que você quer ouvir?" 
        type="text" 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      
      {showResults ? (
        <div className="search-results">
          {noResults && (
            <div className="no-results">
              <span className="no-results-icon">❌</span>
              <p>Ops! Não encontramos nada. Verifique sua pesquisa e tente novamente!</p>
            </div>
          )}

          {streamingResults.length > 0 && (
            <div className="search-section">
              <h3>Músicas via Streaming</h3>
              {streamingResults.map(item => (
                <button key={item.id} className="search-track-item" onClick={() => handlePlay(item, false)}>
                  <img src={item.artwork} alt={item.title} className="search-track-art" />
                  <div className="search-track-info">
                    <span className="search-track-title">{item.title}</span>
                    <span className="search-track-artist">{item.artist}</span>
                  </div>
                </button>
              ))}
            </div>
          )}

          {offlineResults.length > 0 && (
            <div className="search-section">
              <h3>Músicas Offline</h3>
              {offlineResults.map(item => (
                <button key={item.id} className="search-track-item" onClick={() => handlePlay(item, true)}>
                  <img src={item.capa} alt={item.titulo} className="search-track-art" />
                  <div className="search-track-info">
                    <span className="search-track-title">{item.titulo}</span>
                    <span className="search-track-artist">{item.artista}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      ) : (
        <>
          <h2 className="search-sub">Playlists para você</h2>
          <div className="search-grid">
            {recommendedAlbums.map((item, index) => (
              <button 
                key={item.id}
                className="search-card"
                style={{ backgroundColor: colors[index % colors.length] }}
                onClick={() => navigate && navigate('PlaylistScreen', { album: item })}
              >
                <span className="search-card-text">{item.title}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
