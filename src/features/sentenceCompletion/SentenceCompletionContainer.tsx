import React from 'react';
import { PenLine } from 'lucide-react';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import sectionsRegistry from '../../data/sectionsRegistry';
import { advanceStage, nextQuestion } from '../../store/sessionSlice';
import type { SentenceQuestion } from '../../types';
import SentenceCompletion from './SentenceCompletion';

interface SentenceCompletionContainerProps {}

const SentenceCompletionContainer: React.FC<SentenceCompletionContainerProps> = () => {
  const dispatch = useAppDispatch();
  const currentQuestionIndex = useAppSelector((state) => state.session.currentQuestionIndex);
  const currentSectionId = useAppSelector((state) => state.session.currentSectionId);
  const sectionData = sectionsRegistry[currentSectionId ?? ''];
  const questions: SentenceQuestion[] = sectionData?.stage_1_sentences ?? [];

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleNext = () => {
    if (isLastQuestion) {
      dispatch(advanceStage());
    } else {
      dispatch(nextQuestion());
    }
  };

  return (
    <SentenceCompletion
      currentQuestion={currentQuestion}
      onNext={handleNext}
      stageIcon={<PenLine size={36} />}
    />
  );
};

export default SentenceCompletionContainer;
