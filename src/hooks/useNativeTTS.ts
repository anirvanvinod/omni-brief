"use client";

import { useState, useEffect, useCallback } from 'react';

export function useNativeTTS() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSupported(false);
    }
  }, []);

  const play = useCallback((text: string) => {
    if (!supported) return;

    window.speechSynthesis.cancel(); // Stop any current speech

    const newUtterance = new SpeechSynthesisUtterance(text);
    
    // Try to find a premium/natural English voice
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => v.lang.includes('en') && (v.name.includes('Premium') || v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha')));
    
    if (preferredVoice) {
      newUtterance.voice = preferredVoice;
    }
    
    newUtterance.rate = 1.0;
    newUtterance.pitch = 1.0;

    newUtterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
    };

    newUtterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    newUtterance.onerror = (e) => {
      console.error('Speech synthesis error', e);
      setIsPlaying(false);
      setIsPaused(false);
    };

    window.speechSynthesis.speak(newUtterance);
  }, [supported]);

  const togglePause = useCallback(() => {
    if (!supported) return;
    
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsPlaying(true);
    } else if (window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
      setIsPaused(true);
      setIsPlaying(false);
    }
  }, [supported]);

  const stop = useCallback(() => {
    if (!supported) return;
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
  }, [supported]);

  return { play, togglePause, stop, isPlaying, isPaused, supported };
}
