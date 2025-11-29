import { useState, useEffect, useRef } from 'react';
import { getAudioMetadata } from '../utils/audioUtils';

export const useAudio = (cantique) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [audioMetadata, setAudioMetadata] = useState(null);

  const audioRef = useRef(null);

  // Initialiser les métadonnées audio
  useEffect(() => {
    if (cantique) {
      const metadata = getAudioMetadata(cantique);
      setAudioMetadata(metadata);
    }
  }, [cantique]);

  // Gestionnaires d'événements audio
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);
    const handleLoadStart = () => setIsLoading(true);
    const handleCanPlay = () => {
      setIsLoading(false);
      setHasError(false);
    };
    const handleError = () => {
      setIsLoading(false);
      setHasError(true);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('error', handleError);
    };
  }, [audioMetadata?.audioFile]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio || hasError) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        // Pour Safari iOS: charger explicitement avant de jouer
        audio.load();
        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        console.error('Erreur de lecture audio:', error);
        setHasError(true);
        setIsPlaying(false);
      }
    }
  };

  const seek = (time) => {
    const audio = audioRef.current;
    if (!audio || hasError) return;

    audio.currentTime = time;
    setCurrentTime(time);
  };

  const seekToPercent = (percent) => {
    if (duration > 0) {
      const newTime = (percent / 100) * duration;
      seek(newTime);
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const changeVolume = (newVolume) => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = newVolume;
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return {
    // État
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    isLoading,
    hasError,
    audioMetadata,
    progress,
    
    // Actions
    togglePlay,
    seek,
    seekToPercent,
    toggleMute,
    changeVolume,
    
    // Utilitaires
    formatTime,
    
    // Ref
    audioRef
  };
};

export default useAudio;