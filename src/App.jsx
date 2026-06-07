import React, { useState } from 'react';
import { AudioProvider } from './context/AudioContext';
import MainTabs from './components/MainTabs';
import MiniPlayer from './components/MiniPlayer';
import PlayerScreen from './screens/PlayerScreen';
import PlaylistScreen from './screens/PlaylistScreen';
import FriendProfileScreen from './screens/FriendProfileScreen';
import AuthScreen from './screens/AuthScreen';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('currentUser') !== null;
  });
  const [currentScreen, setCurrentScreen] = useState('MainTabs');
  const [screenParams, setScreenParams] = useState(null);

  const navigate = (screenName, params = null) => {
    setScreenParams(params);
    setCurrentScreen(screenName);
  };

  const goBack = () => {
    setCurrentScreen('MainTabs');
    setScreenParams(null);
  };

  if (!isLoggedIn) {
    return <AuthScreen onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <AudioProvider>
      <div className="app-wrapper">
        <MainTabs navigate={navigate} />
        
        {currentScreen === 'PlaylistScreen' && (
          <PlaylistScreen album={screenParams?.album} goBack={goBack} />
        )}

        {currentScreen === 'FriendProfileScreen' && (
          <FriendProfileScreen friend={screenParams?.friend} goBack={goBack} />
        )}

        <MiniPlayer />
        <PlayerScreen />
      </div>
    </AudioProvider>
  );
}

export default App;
