// src/screens/SearchScreen.jsx
import React from 'react';
import './SearchScreen.css';
import { recommendedAlbums } from '../mockData.js';

export default function SearchScreen({ navigate }) {
  const colors = ['#E8115B', '#148A08', '#BC5900', '#777777'];

  return (
    <div className="search-container">
      <h1 className="search-header">Buscar</h1>
      <input 
        className="search-input" 
        placeholder="O que você quer ouvir?" 
        type="text" 
      />
      
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
    </div>
  );
}
