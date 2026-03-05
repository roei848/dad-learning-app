import React from 'react';
import { BookText } from 'lucide-react';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { advanceStage, nextQuestion } from '../../store/sessionSlice';
import type { StoryQuestion } from '../../types';
import restaurantData from '../../data/restaurant.json';
import StoryComprehension from './StoryComprehension';

interface StoryComprehensionContainerProps {}

const storyText: string = (restaurantData as { stage_2_story: { text_en: string; questions: StoryQuestion[] } }).stage_2_story.text_en;
const questions: StoryQuestion[] = (restaurantData as { stage_2_story: { text_en: string; questions: StoryQuestion[] } }).stage_2_story.questions;

const StoryComprehensionContainer: React.FC<StoryComprehensionContainerProps> = () => {
  const dispatch = useAppDispatch();
  const currentQuestionIndex = useAppSelector((state) => state.session.currentQuestionIndex);

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
    <StoryComprehension
      storyText={storyText}
      currentQuestion={currentQuestion}
      onNext={handleNext}
      stageIcon={<BookText size={36} />}
    />
  );
};

export default StoryComprehensionContainer;
