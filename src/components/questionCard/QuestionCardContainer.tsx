import React, { useState, useCallback } from 'react';

import { submitAnswer } from '../../store/sessionSlice';
import { useAppDispatch } from '../../app/hooks';
import { useSpeech } from '../../hooks/useSpeech';
import QuestionCard from './QuestionCard';

export interface QuestionCardContainerProps {
  questionId: number;
  questionText: string;
  options: string[];
  correctAnswer: string;
  hintHebrew?: string;
  onNext: () => void;
}


/** Maps the correctAnswer letter to its zero-based index in the options array. */
const ANSWER_LETTER_TO_INDEX: Record<string, number> = {
  a: 0,
  b: 1,
  c: 2,
  d: 3,
};

const QuestionCardContainer: React.FC<QuestionCardContainerProps> = ({
  questionId,
  questionText,
  options,
  correctAnswer,
  hintHebrew,
  onNext,
}) => {
  const dispatch = useAppDispatch();

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isHintVisible, setIsHintVisible] = useState<boolean>(false);

  const { isPlaying: isAudioPlaying, play: handlePlayAudio } = useSpeech(
    questionText.replace(/_+/g, '...'),
  );

  const isAnswered = selectedAnswer !== null;

  /**
   * Handles option selection. Guards against re-selection once answered.
   * Derives correctness by comparing the selected option label against
   * options[ANSWER_LETTER_TO_INDEX[correctAnswer]].
   */
  const handleSelectOption = useCallback(
    (selectedOption: string) => {
      if (isAnswered) return;

      const correctIndex = ANSWER_LETTER_TO_INDEX[correctAnswer];
      const correctOptionLabel = options[correctIndex];
      const isCorrect = selectedOption === correctOptionLabel;

      dispatch(submitAnswer({ questionId, answer: selectedOption, isCorrect }));
      setSelectedAnswer(selectedOption);
    },
    [isAnswered, correctAnswer, options, dispatch, questionId],
  );

  const handleToggleHint = useCallback(() => {
    setIsHintVisible((prev) => !prev);
  }, []);

  const handleNext = useCallback(() => {
    onNext();
  }, [onNext]);

  return (
    <QuestionCard
      questionText={questionText}
      options={options}
      correctAnswer={correctAnswer}
      selectedAnswer={selectedAnswer}
      isAnswered={isAnswered}
      hintHebrew={hintHebrew}
      isHintVisible={isHintVisible}
      isAudioPlaying={isAudioPlaying}
      onSelectOption={handleSelectOption}
      onToggleHint={handleToggleHint}
      onPlayAudio={handlePlayAudio}
      onNext={handleNext}
    />
  );
};

export default QuestionCardContainer;
