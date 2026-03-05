import React from 'react';
import styled from 'styled-components';

import OptionButtonContainer from '../optionButton/OptionButtonContainer';
import HebrewHint from '../hebrewHint/HebrewHint';

export interface QuestionCardPresenterProps {
  questionText: string;
  options: string[];
  correctAnswer: string;
  selectedAnswer: string | null;
  isAnswered: boolean;
  hintHebrew?: string;
  isHintVisible: boolean;
  onSelectOption: (option: string) => void;
  onToggleHint: () => void;
  onNext: () => void;
}

/** Maps the correctAnswer letter to its zero-based index in the options array. */
const ANSWER_LETTER_TO_INDEX: Record<string, number> = {
  a: 0,
  b: 1,
  c: 2,
  d: 3,
};

const QuestionCard: React.FC<QuestionCardPresenterProps> = ({
  questionText,
  options,
  correctAnswer,
  selectedAnswer,
  isAnswered,
  hintHebrew,
  isHintVisible,
  onSelectOption,
  onToggleHint,
  onNext,
}) => {
  const correctIndex = ANSWER_LETTER_TO_INDEX[correctAnswer];

  return (
    <QuestionCardWrapper>
      <div className="question-card__header">
        <p className="question-card__text">{questionText}</p>
        {hintHebrew && (
          <div className="question-card__hint">
            <HebrewHint
              hint={hintHebrew}
              isVisible={isHintVisible}
              onToggle={onToggleHint}
            />
          </div>
        )}
      </div>

      <ul className="question-card__options" role="list">
        {options.map((option) => (
          <li key={option} className="question-card__option-item">
            <OptionButtonContainer
              label={option}
              isCorrect={option === options[correctIndex]}
              isDisabled={isAnswered}
              selectedAnswer={selectedAnswer}
              onSelect={onSelectOption}
            />
          </li>
        ))}
      </ul>

      {isAnswered && (
        <button
          className="question-card__next-btn"
          onClick={onNext}
          type="button"
        >
          Next
        </button>
      )}
    </QuestionCardWrapper>
  );
};

export default QuestionCard;

// ui-ux-pro-max: Claymorphism — white card with soft layered shadows, chunky 12px radius,
// smooth 200ms ease-out transitions on interactive elements.
const QuestionCardWrapper = styled.div`
  background: ${({ theme }) => theme.colors.cardBackground};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadow};
  padding: ${({ theme }) => theme.spacing.xl};
  max-width: ${({ theme }) => theme.layout.contentWidth};
  width: 100%;

  .question-card__header {
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }

  .question-card__text {
    margin: 0 0 ${({ theme }) => theme.spacing.md};
    font-family: ${({ theme }) => theme.typography.fontFamily};
    /* ui-ux-pro-max: 20px body minimum; use subheading (24px) for prominence */
    font-size: ${({ theme }) => theme.typography.subheading};
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
    line-height: ${({ theme }) => theme.typography.lineHeight};
  }

  .question-card__hint {
    margin-top: ${({ theme }) => theme.spacing.sm};
  }

  .question-card__options {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.md};
  }

  .question-card__option-item {
    width: 100%;
  }

  .question-card__next-btn {
    display: block;
    width: 100%;
    margin-top: ${({ theme }) => theme.spacing.lg};
    padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.cardBackground};
    font-family: ${({ theme }) => theme.typography.fontFamily};
    font-size: ${({ theme }) => theme.typography.body};
    font-weight: 600;
    border: none;
    border-radius: ${({ theme }) => theme.borderRadius};
    cursor: pointer;
    /* ui-ux-pro-max: Claymorphism outer shadow + smooth 200ms ease-out press */
    box-shadow: ${({ theme }) => theme.shadow};
    transition: all ${({ theme }) => theme.transition};

    &:hover {
      box-shadow: ${({ theme }) => theme.shadowHover};
      /* ui-ux-pro-max: slight lift on hover for Claymorphism depth */
      transform: translateY(-1px);
    }

    &:active {
      /* ui-ux-pro-max: soft press — scale down slightly */
      transform: scale(0.98) translateY(0);
      box-shadow: ${({ theme }) => theme.shadow};
    }

    /* ui-ux-pro-max: visible focus ring for keyboard nav */
    &:focus-visible {
      outline: 2px solid ${({ theme }) => theme.colors.primary};
      outline-offset: 3px;
    }
  }

  /* ui-ux-pro-max: respect prefers-reduced-motion */
  @media (prefers-reduced-motion: reduce) {
    .question-card__next-btn {
      transition: background-color ${({ theme }) => theme.transition};

      &:hover,
      &:active {
        transform: none;
      }
    }
  }
`;
