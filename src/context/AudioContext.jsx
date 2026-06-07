/**
 * AudioContext.jsx
 * 
 * Este arquivo funciona como o "Motor de Áudio" do aplicativo.
 * Ele usa a Context API do React para criar um player de música global que
 * continua tocando independente da tela em que o usuário está navegando.
 */
import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  // Estado principal da música atual
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [positionMs, setPositionMs] = useState(0);
  const [durationMs, setDurationMs] = useState(0);
  
  // Estado global para as músicas da biblioteca não sumirem ao trocar de aba (Lifting State Up)
  const [musicas, setMusicas] = useState([]);
  
  // Controle de visibilidade do Player Gigante
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);

  // Referências mutáveis que não causam re-renderização (otimização de performance)
  const audioRef = useRef(new Audio());
  const currentTrackRef = useRef(null);
  const currentPlaylistRef = useRef([]);

  // Configura os ouvintes (listeners) do elemento <audio> HTML5
  useEffect(() => {
    const audio = audioRef.current;
    
    // Atualiza a barra de progresso da música em tempo real
    const updateTime = () => setPositionMs(audio.currentTime * 1000);
    const updateDuration = () => setDurationMs(audio.duration * 1000);
    
    // Quando a música acaba, pula para a próxima automaticamente
    const handleEnded = () => playNext();
    
    // Sincroniza os botões de Play/Pause com a realidade do player nativo
    const handlePlayEvent = () => setIsPlaying(true);
    const handlePauseEvent = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('play', handlePlayEvent);
    audio.addEventListener('pause', handlePauseEvent);

    // Limpeza dos eventos para evitar vazamento de memória (memory leak) ao desmontar
    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('play', handlePlayEvent);
      audio.removeEventListener('pause', handlePauseEvent);
    };
  }, []);

  const playTrack = (track, playlist = null) => {
    setCurrentTrack(track);
    currentTrackRef.current = track;
    if (playlist) {
      currentPlaylistRef.current = playlist;
    }
    audioRef.current.src = track.url;
    audioRef.current.play().catch(e => console.error("Error playing audio", e));

    // Integração com o OS (Windows, Android, iOS)
    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: track.title || track.titulo,
        artist: track.artist || track.artista,
        album: 'NassauMusic Web',
        artwork: [
          { src: track.artwork || track.capa, sizes: '512x512', type: 'image/jpeg' },
          { src: track.artwork || track.capa, sizes: '256x256', type: 'image/jpeg' }
        ]
      });

      navigator.mediaSession.setActionHandler('play', () => {
        audioRef.current.play();
      });
      navigator.mediaSession.setActionHandler('pause', () => {
        audioRef.current.pause();
      });
      navigator.mediaSession.setActionHandler('previoustrack', () => {
        playPrevious();
      });
      navigator.mediaSession.setActionHandler('nexttrack', () => {
        playNext();
      });
      navigator.mediaSession.setActionHandler('seekto', (details) => {
        const time = details.seekTime;
        audioRef.current.currentTime = time;
        setPositionMs(time * 1000);
      });
    }
  };

  const togglePlayPause = () => {
    if (!currentTrack) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.error("Error playing audio", e));
    }
  };

  const seekTo = (ms) => {
    audioRef.current.currentTime = ms / 1000;
    setPositionMs(ms);
  };

  const playNext = () => {
    const track = currentTrackRef.current;
    const list = currentPlaylistRef.current;
    if (!track || !list || list.length === 0) return;
    
    const currentIndex = list.findIndex(t => t.id === track.id);
    if (currentIndex !== -1) {
      const nextIndex = (currentIndex + 1) % list.length;
      playTrack(list[nextIndex]); // playlist já está salva no ref, não precisa passar de novo
    }
  };

  const playPrevious = () => {
    const track = currentTrackRef.current;
    const list = currentPlaylistRef.current;
    if (!track || !list || list.length === 0) return;
    
    const currentIndex = list.findIndex(t => t.id === track.id);
    if (currentIndex !== -1) {
      const prevIndex = (currentIndex - 1 + list.length) % list.length;
      playTrack(list[prevIndex]);
    }
  };

  const openPlayer = () => setIsPlayerOpen(true);
  const closePlayer = () => setIsPlayerOpen(false);

  return (
    <AudioContext.Provider value={{ 
      currentTrack, 
      isPlaying, 
      positionMs, 
      durationMs, 
      playTrack, 
      togglePlayPause,
      seekTo,
      playNext,
      playPrevious,
      isPlayerOpen,
      openPlayer,
      closePlayer,
      musicas,
      setMusicas
    }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => useContext(AudioContext);
