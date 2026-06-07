import React, { useState } from 'react';
import { AudioProvider } from './context/AudioContext';
import MainTabs from './components/MainTabs';
import MiniPlayer from './components/MiniPlayer';
import PlayerScreen from './screens/PlayerScreen';
import PlaylistScreen from './screens/PlaylistScreen';
import FriendProfileScreen from './screens/FriendProfileScreen';
import AuthScreen from './screens/AuthScreen';
import './App.css';

/**
 * Componente principal da aplicação.
 * Gerencia o estado global de autenticação e o sistema de navegação por abas/telas.
 */
function App() {
  // Verifica se existe um usuário salvo no localStorage para pular a tela de login
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('currentUser') !== null;
  });
  
  // Controle de navegação manual (state-based routing)
  const [currentScreen, setCurrentScreen] = useState('MainTabs');
  const [screenParams, setScreenParams] = useState(null);

  // Função para abrir novas telas (ex: Playlist, Perfil do Amigo)
  const navigate = (screenName, params = null) => {
    setScreenParams(params);
    setCurrentScreen(screenName);
  };

  // Função para voltar para a tela principal
  const goBack = () => {
    setCurrentScreen('MainTabs');
    setScreenParams(null);
  };

  // Se não estiver logado, barra a entrada e renderiza a tela de autenticação
  if (!isLoggedIn) {
    return <AuthScreen onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    /* AudioProvider envolve toda a aplicação para garantir que a música continue tocando ao trocar de telas */
    <AudioProvider>
      <div className="app-wrapper">
        {/* Barra de navegação inferior (sempre presente) */}
        <MainTabs navigate={navigate} />
        
        {/* Telas que se sobrepõem à navegação principal */}
        {currentScreen === 'PlaylistScreen' && (
          <PlaylistScreen album={screenParams?.album} goBack={goBack} />
        )}

        {currentScreen === 'FriendProfileScreen' && (
          <FriendProfileScreen friend={screenParams?.friend} goBack={goBack} />
        )}

        {/* Players globais: mantêm o estado visual sincronizado com o áudio */}
        <MiniPlayer />
        <PlayerScreen />
      </div>
    </AudioProvider>
  );
}

export default App;
