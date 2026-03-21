import { useState, useEffect } from 'react';

export type Tone = 'ELI5' | 'Professional' | 'Witty';

export interface Preferences {
  categories: string[];
  tone: Tone;
  tickers: string[];
  hasCompletedOnboarding: boolean;
}

const defaultPreferences: Preferences = {
  categories: [],
  tone: 'Professional',
  tickers: [],
  hasCompletedOnboarding: false,
};

export function usePreferences() {
  const [preferences, setPreferences] = useState<Preferences>(defaultPreferences);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
    const stored = localStorage.getItem('omnibrief-preferences');
    if (stored) {
      try {
        setPreferences(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse preferences from localStorage', e);
      }
    }
  }, []);

  const updatePreferences = (newPrefs: Partial<Preferences>) => {
    const updated = { ...preferences, ...newPrefs };
    setPreferences(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('omnibrief-preferences', JSON.stringify(updated));
    }
  };

  return { preferences, updatePreferences, isMounted };
}
