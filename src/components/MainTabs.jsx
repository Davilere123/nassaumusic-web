/**
 * MainTabs.jsx
 * 
 * Controlador de abas principais (Navegação Inferior).
 * Ele altera qual tela está visível e mantém a barra fixa na base do aplicativo.
 */

import React, { useState } from 'react';
import { Home, Search, Library } from 'lucide-react';
import './MainTabs.css';

import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import LibraryScreen from '../screens/LibraryScreen';

export default function MainTabs({ navigate }) {
  const [activeTab, setActiveTab] = useState('Inicio');

  const renderScreen = () => {
    switch (activeTab) {
      case 'Inicio': return <HomeScreen navigate={navigate} />;
      case 'Buscar': return <SearchScreen navigate={navigate} />;
      case 'Biblioteca': return <LibraryScreen navigate={navigate} />;
      default: return <HomeScreen navigate={navigate} />;
    }
  };

  return (
    <div className="tabs-wrapper">
      <div className="tabs-content">
        {renderScreen()}
      </div>

      <nav className="tabs-bar">
        <button
          className={`tab-item ${activeTab === 'Inicio' ? 'active' : ''}`}
          onClick={() => setActiveTab('Inicio')}
        >
          <Home size={24} color={activeTab === 'Inicio' ? '#9333ea' : '#b3b3b3'} />
          <span className="tab-label">Início</span>
        </button>

        <button
          className={`tab-item ${activeTab === 'Buscar' ? 'active' : ''}`}
          onClick={() => setActiveTab('Buscar')}
        >
          <Search size={24} color={activeTab === 'Buscar' ? '#9333ea' : '#b3b3b3'} />
          <span className="tab-label">Buscar</span>
        </button>

        <button
          className={`tab-item ${activeTab === 'Biblioteca' ? 'active' : ''}`}
          onClick={() => setActiveTab('Biblioteca')}
        >
          <Library size={24} color={activeTab === 'Biblioteca' ? '#9333ea' : '#b3b3b3'} />
          <span className="tab-label">Biblioteca</span>
        </button>
      </nav>
    </div>
  );
}
