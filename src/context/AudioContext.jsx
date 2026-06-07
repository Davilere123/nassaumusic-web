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

  useEffect(() => {
    const audio = audioRef.current;
    
    const updateTime = () => setPositionMs(audio.currentTime * 1000);
    const updateDuration = () => setDurationMs(audio.duration * 1000);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const playTrack = (track) => {
    setCurrentTrack(track);
    audioRef.current.src = track.url;
    audioRef.current.play()
      .then(() => setIsPlaying(true))
      .catch(e => console.error("Error playing audio", e));
  };

  const togglePlayPause = () => {
    if (!currentTrack) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(e => console.error("Error playing audio", e));
    }
  };

  const seekTo = (ms) => {
    audioRef.current.currentTime = ms / 1000;
    setPositionMs(ms);
  };

  const playNext = () => {
    console.log("Mock playNext");
  };

  const playPrevious = () => {
    console.log("Mock playPrevious");
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
