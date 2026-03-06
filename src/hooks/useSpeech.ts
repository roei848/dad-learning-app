import { useState, useCallback } from 'react';

export function useSpeech(text: string): { isPlaying: boolean; play: () => void } {
  const [isPlaying, setIsPlaying] = useState(false);

  const play = useCallback(() => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.5;
    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);
    window.speechSynthesis.speak(utterance);
  }, [text]);

  return { isPlaying, play };
}
