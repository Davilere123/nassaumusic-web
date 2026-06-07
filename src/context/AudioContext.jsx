import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [positionMs, setPositionMs] = useState(0);
  const [durationMs, setDurationMs] = useState(0);
  
  // Estado para as músicas da biblioteca não sumirem ao trocar de aba
  const [musicas, setMusicas] = useState([]);
  
  // UI State for Player Modal
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);

  const audioRef = useRef(new Audio());
  const currentTrackRef = useRef(null);
  const currentPlaylistRef = useRef([]);

  useEffect(() => {
    const audio = audioRef.current;
    
    const updateTime = () => setPositionMs(audio.currentTime * 1000);
    const updateDuration = () => setDurationMs(audio.duration * 1000);
    
    // Agora o final da música vai tocar a próxima
    const handleEnded = () => playNext();
    const handlePlayEvent = () => setIsPlaying(true);
    const handlePauseEvent = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('play', handlePlayEvent);
    audio.addEventListener('pause', handlePauseEvent);

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
