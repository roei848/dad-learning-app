import React, { useCallback } from 'react';

import OptionButton from './OptionButton';

interface OptionButtonContainerProps {
  label: string;
  isCorrect: boolean;
  isDisabled: boolean;
  selectedAnswer: string | null;
  onSelect: (label: string) => void;
}

type OptionButtonState = 'default' | 'selected' | 'correct' | 'wrong';

/**
 * Derives the visual state of an option button from the current quiz state.
 * After answering (isDisabled), we reveal both the selected result and the
 * correct answer if the user picked wrong — so the correct option also turns green.
 */
function deriveState(
  label: string,
  isCorrect: boolean,
  isDisabled: boolean,
  selectedAnswer: string | null,
): OptionButtonState {
  const isSelected = selectedAnswer === label;

  if (!isDisabled) {
    return isSelected ? 'selected' : 'default';
  }

  if (isSelected) {
    return isCorrect ? 'correct' : 'wrong';
  }

  return isCorrect ? 'correct' : 'default';
}

const OptionButtonContainer: React.FC<OptionButtonContainerProps> = ({
  label,
  isCorrect,
  isDisabled,
  selectedAnswer,
  onSelect,
}) => {
  const state = deriveState(label, isCorrect, isDisabled, selectedAnswer);

  const handleClick = useCallback(() => {
    if (!isDisabled) {
      onSelect(label);
    }
  }, [isDisabled, label, onSelect]);

  return (
    <OptionButton
      label={label}
      state={state}
      isDisabled={isDisabled}
      onClick={handleClick}
    />
  );
};

export default OptionButtonContainer;
