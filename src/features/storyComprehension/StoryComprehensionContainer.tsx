import React from 'react';
import { BookText } from 'lucide-react';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import sectionsRegistry from '../../data/sectionsRegistry';
import { advanceStage, nextQuestion } from '../../store/sessionSlice';
import { markCompleted } from '../../store/sectionsSlice';
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

  return (
    <StoryComprehension
      storyText={storyText}
      currentQuestion={currentQuestion}
      onNext={handleNext}
      stageIcon={<BookText size={36} />}
    />
  );
};

export default StoryComprehensionContainer;
