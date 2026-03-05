import React from 'react';
import { MessageSquare } from 'lucide-react';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { advanceStage, nextQuestion } from '../../store/sessionSlice';
import { markCompleted } from '../../store/sectionsSlice';
import restaurantData from '../../data/restaurant.json';
import type { VisualQuestion } from '../../types';
import VisualContext from './VisualContext';

interface VisualContextContainerProps {}

const VisualContextContainer: React.FC<VisualContextContainerProps> = () => {
  const dispatch = useAppDispatch();
  const currentQuestionIndex = useAppSelector((state) => state.session.currentQuestionIndex);
  const correctCount = useAppSelector((state) => state.session.correctCount);
  const currentSectionId = useAppSelector((state) => state.session.currentSectionId);

  const questions: VisualQuestion[] = restaurantData.stage_3_visual_situational as VisualQuestion[];
  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  /**
   * On the final visual context question, marks the section completed with the
   * accumulated correctCount before advancing to the sectionComplete stage.
   * totalQuestions is fixed at 30 — the full session across all three stages.
   */
  const handleNext = () => {
    if (isLastQuestion) {
      if (currentSectionId) {
        dispatch(
          markCompleted({
            sectionId: currentSectionId,
            score: correctCount,
            totalQuestions: 30,
          }),
        );
      }
      dispatch(advanceStage());
    } else {
      dispatch(nextQuestion());
    }
  };

  return (
    <VisualContext
      currentQuestion={currentQuestion}
      onNext={handleNext}
      stageIcon={<MessageSquare size={36} />}
    />
  );
};

export default VisualContextContainer;
