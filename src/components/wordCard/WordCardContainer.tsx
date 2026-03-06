import React from 'react';

import { useSpeech } from '../../hooks/useSpeech';
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
  const { isPlaying, play } = useSpeech(word);

  return (
    <WordCard
      word={word}
      translation={translation}
      example={example}
      onPlayAudio={play}
      isPlaying={isPlaying}
    />
  );
};

export default WordCardContainer;
