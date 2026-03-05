import React from 'react';
import { BookOpen } from 'lucide-react';

import restaurantData from '../../data/restaurant.json';
import { useAppDispatch } from '../../app/hooks';
import { advanceStage } from '../../store/sessionSlice';
import type { WordBankItem } from '../../types';
import WordBank from './WordBank';

interface WordBankContainerProps {}

const WordBankContainer: React.FC<WordBankContainerProps> = () => {
  const dispatch = useAppDispatch();
  const wordBank: WordBankItem[] = restaurantData.word_bank;

  const handleStartLearning = () => {
    dispatch(advanceStage());
  };

  return (
    <WordBank
      wordBank={wordBank}
      onStartLearning={handleStartLearning}
      icon={<BookOpen size={36} />}
    />
  );
};

export default WordBankContainer;
