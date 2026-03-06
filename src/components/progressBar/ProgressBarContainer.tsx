import React from 'react';
import { useAppSelector } from '../../app/hooks';
import ProgressBar from './ProgressBar';
import type { Stage } from '../../types';

interface ProgressBarContainerProps {}

const stageOffset: Record<Stage, number> = {
  wordBank: 0,
  sentenceCompletion: 0,
  storyComprehension: 10,
  sectionComplete: 20,
};

const TOTAL_QUESTIONS = 20;

const ProgressBarContainer: React.FC<ProgressBarContainerProps> = () => {
  const { currentStage, currentQuestionIndex } = useAppSelector(
    (state) => state.session,
  );

  const offset = stageOffset[currentStage] ?? 0;
  const overallQuestion = offset + currentQuestionIndex + 1;

  /**
   * Cap at totalQuestions so the bar never overflows (e.g. when stage is
   * sectionComplete and index is 0, overallQuestion would be 31).
   */
  const clampedQuestion = Math.min(overallQuestion, TOTAL_QUESTIONS);
  const progress =
    TOTAL_QUESTIONS > 0 ? (clampedQuestion / TOTAL_QUESTIONS) * 100 : 0;

  return (
    <ProgressBar
      overallQuestion={clampedQuestion}
      totalQuestions={TOTAL_QUESTIONS}
      progress={progress}
    />
  );
};

export default ProgressBarContainer;
