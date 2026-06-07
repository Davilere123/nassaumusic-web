/**
 * FriendProfileScreen.jsx
 * 
 * Exibe o perfil social de um amigo, incluindo a atividade recente
 * dele e a música que está ouvindo no momento.
 */
import React from 'react';
import { ChevronLeft, Music } from 'lucide-react';
import './FriendProfileScreen.css';

export default function FriendProfileScreen({ friend, goBack }) {
  const currentFriend = friend || { name: 'Amigo', avatar: 'https://i.pravatar.cc/150' };

  return (
    <div className="friend-profile-overlay">
      <button className="friend-back-btn" onClick={goBack}>
        <ChevronLeft size={24} color="#000" />
      </button>

      <img src={currentFriend.avatar} alt="Cover" className="friend-cover" />
      
      <div className="friend-content">
        <img src={currentFriend.avatar} alt="Avatar" className="friend-avatar-large" />
        <h2 className="friend-name-large">{currentFriend.name}</h2>
        <p className="friend-sub-large">Seguindo • 12 Playlists</p>
        
        <h3 className="friend-section-title">Recentemente ouvido</h3>
        <p className="friend-empty-text">Atividade de escuta privada no momento.</p>
      </div>
    </div>
  );
}
