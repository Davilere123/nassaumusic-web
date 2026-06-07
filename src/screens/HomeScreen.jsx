// src/screens/HomeScreen.jsx
import React from 'react';
import { Music, LogOut } from 'lucide-react';
import './HomeScreen.css';
import { friendsActivity, recommendedAlbums, tracks } from '../mockData.js';
import { useAudio } from '../context/AudioContext';

export default function HomeScreen({ navigate }) {
  const { playTrack, openPlayer } = useAudio();

  // Função para tocar e abrir a tela cheia
  const handlePlay = (item) => {
    playTrack(item, tracks);
    openPlayer();
  };

  return (
    <div className="home-container">
      <div className="scroll-view">

        {/* Header */}
        <div className="header">
          <h1 className="greeting">Bem vindo!</h1>
          <div className="header-icons">
            <button className="home-logout-btn" onClick={() => {
              localStorage.removeItem('currentUser');
              window.location.reload();
            }}>
              <LogOut size={20} color="#fff" />
              <span className="home-logout-text">Sair</span>
            </button>
          </div>
        </div>

        {/* Atividade dos Amigos */}
        <div className="section">
          <h2 className="section-title">Atividade dos amigos</h2>
          <div className="horizontal-scroll">
            {friendsActivity.map((item) => (
              <button
                key={item.id}
                className="friend-card"
                onClick={() => navigate && navigate('FriendProfileScreen', { friend: item })}
              >
                <div className="avatar-wrapper">
                  <img src={item.avatar} alt={item.name} className="friend-avatar" />
                  <div className="friend-music-icon">
                    <Music size={12} color="#fff" />
                  </div>
                </div>
                <span className="friend-name">{item.name}</span>
                <span className="friend-listening" title={item.listening}>{item.listening}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Músicas para você */}
        <div className="section">
          <h2 className="section-title">Músicas para você</h2>
          {tracks.map((item) => (
            <button
              key={item.id}
              className="track-item"
              onClick={() => handlePlay(item)}
            >
              <img src={item.artwork} alt={item.title} className="track-art" />
              <div className="track-info">
                <span className="track-title">{item.title}</span>
                <span className="track-artist">{item.artist}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Feito para você (Seus Álbuns/Playlists) */}
        <div className="section">
          <h2 className="section-title">Feito para você</h2>
          <div className="horizontal-scroll">
            {recommendedAlbums.map((item) => (
              <button
                key={item.id}
                className="album-card"
                onClick={() => navigate && navigate('PlaylistScreen', { album: item })}
              >
                <img src={item.image} alt={item.title} className="album-image" />
                <span className="album-title">{item.title}</span>
              </button>
            ))}
          </div>
        </div>

        <div style={{ height: '110px' }} />
      </div>
    </div>
  );
}
