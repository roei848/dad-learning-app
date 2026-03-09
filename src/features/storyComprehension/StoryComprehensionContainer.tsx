import React, { useState } from 'react';
import { BookText } from 'lucide-react';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import sectionsRegistry from '../../data/sectionsRegistry';
import { markCompleted } from '../../store/sectionsSlice';
import { advanceStage, nextQuestion, resetSession } from '../../store/sessionSlice';
import type { StoryQuestion } from '../../types';
import StoryComprehension from './StoryComprehension';

interface StoryComprehensionContainerProps {}

const StoryComprehensionContainer: React.FC<StoryComprehensionContainerProps> = () => {
  const dispatch = useAppDispatch();
  const currentQuestionIndex = useAppSelector((state) => state.session.currentQuestionIndex);
  const correctCount = useAppSelector((state) => state.session.correctCount);
  const currentSectionId = useAppSelector((state) => state.session.currentSectionId);
  const sectionData = sectionsRegistry[currentSectionId ?? ''];
  const storyText: string = sectionData?.stage_2_story.text_en ?? '';
  const questions: StoryQuestion[] = sectionData?.stage_2_story.questions ?? [];

  const [showExitConfirm, setShowExitConfirm] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleNext = () => {
    if (isLastQuestion) {
      if (currentSectionId) {
        dispatch(
          markCompleted({
            sectionId: currentSectionId,
            score: correctCount,
            totalQuestions: 20,
          }),
        );
      }
      dispatch(advanceStage());
    } else {
      dispatch(nextQuestion());
    }
  };

  const handleExitRequest = () => setShowExitConfirm(true);
  const handleExitCancel = () => setShowExitConfirm(false);
  const handleExitConfirm = () => dispatch(resetSession());

  return (
    <StoryComprehension
      storyText={storyText}
      currentQuestion={currentQuestion}
      onNext={handleNext}
      stageIcon={<BookText size={36} />}
      showExitConfirm={showExitConfirm}
      onExitRequest={handleExitRequest}
      onExitConfirm={handleExitConfirm}
      onExitCancel={handleExitCancel}
    />
  );
};

export default StoryComprehensionContainer;
