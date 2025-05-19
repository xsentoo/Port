import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';

type AudioType = 'ambience' | 'keyPress' | 'click' | 'startup' | 'error' | 'windowOpen' | 'windowClose';

interface AudioContextType {
  playSound: (type: AudioType) => void;
  isMuted: boolean;
  toggleMute: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};

const SOUND_URLS = {
  ambience: 'https://assets.codepen.io/217233/ambience.mp3',
  keyPress: 'https://assets.codepen.io/217233/keypress.mp3',
  click: 'https://assets.codepen.io/217233/click.mp3',
  startup: 'https://assets.codepen.io/217233/startup.mp3',
  error: 'https://assets.codepen.io/217233/error.mp3',
  windowOpen: 'https://assets.codepen.io/217233/window-open.mp3',
  windowClose: 'https://assets.codepen.io/217233/window-close.mp3',
};

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [sounds, setSounds] = useState<Record<AudioType, HTMLAudioElement | null>>({
    ambience: null,
    keyPress: null,
    click: null,
    startup: null,
    error: null,
    windowOpen: null,
    windowClose: null,
  });
  const [ambienceAudio, setAmbienceAudio] = useState<HTMLAudioElement | null>(null);

  // Initialize audio elements
  useEffect(() => {
    const newSounds: Record<AudioType, HTMLAudioElement> = {} as Record<AudioType, HTMLAudioElement>;
    
    Object.entries(SOUND_URLS).forEach(([key, url]) => {
      const audio = new Audio(url);
      if (key === 'ambience') {
        audio.loop = true;
        audio.volume = 0.2;
        setAmbienceAudio(audio);
      } else {
        audio.volume = 0.5;
        newSounds[key as AudioType] = audio;
      }
    });

    setSounds(newSounds);

    return () => {
      if (ambienceAudio) {
        ambienceAudio.pause();
      }
    };
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => {
      const newMuted = !prev;
      
      if (ambienceAudio) {
        if (newMuted) {
          ambienceAudio.pause();
        } else {
          ambienceAudio.play().catch(err => console.log('Audio play failed:', err));
        }
      }
      
      return newMuted;
    });
  }, [ambienceAudio]);

  const playSound = useCallback((type: AudioType) => {
    if (isMuted) return;
    
    if (type === 'ambience' && ambienceAudio) {
      ambienceAudio.play().catch(err => console.log('Ambience play failed:', err));
      return;
    }
    
    const sound = sounds[type];
    if (sound) {
      sound.currentTime = 0;
      sound.play().catch(err => console.log(`Sound play failed: ${type}`, err));
    }
  }, [sounds, isMuted, ambienceAudio]);

  return (
    <AudioContext.Provider value={{ playSound, isMuted, toggleMute }}>
      {children}
    </AudioContext.Provider>
  );
};