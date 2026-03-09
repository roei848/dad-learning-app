import React from 'react';
import { BookOpen } from 'lucide-react';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import sectionsRegistry from '../../data/sectionsRegistry';
import { advanceStage, resetSession } from '../../store/sessionSlice';
import type { WordBankItem } from '../../types';
import WordBank from './WordBank';

interface WordBankContainerProps {}

const WordBankContainer: React.FC<WordBankContainerProps> = () => {
  const dispatch = useAppDispatch();
  const currentSectionId = useAppSelector((state) => state.session.currentSectionId);
  const sectionData = sectionsRegistry[currentSectionId ?? ''];
  const wordBank: WordBankItem[] = sectionData?.word_bank ?? [];

  const handleStartLearning = () => {
    dispatch(advanceStage());
  };

  const handleExit = () => {
    dispatch(resetSession());
  };

  return (
    <WordBank
      wordBank={wordBank}
      onStartLearning={handleStartLearning}
      onExit={handleExit}
      icon={<BookOpen size={36} />}
    />
  );
};

export default WordBankContainer;
