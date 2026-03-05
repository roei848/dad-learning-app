import React, { useState } from 'react';

import WordCard from './WordCard';

export interface WordCardContainerProps {
  word: string;
  translation: string;
  example: string;
}

const WordCardContainer: React.FC<WordCardContainerProps> = ({
  word,
  translation,
  example,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayAudio = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // cancel any ongoing speech
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'en-US';
      utterance.rate = 0.85; // slightly slower for learners
      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <WordCard
      word={word}
      translation={translation}
      example={example}
      onPlayAudio={handlePlayAudio}
      isPlaying={isPlaying}
    />
  );
};

export default WordCardContainer;
