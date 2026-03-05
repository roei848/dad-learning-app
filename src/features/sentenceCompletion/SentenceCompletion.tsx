import React from 'react';
import styled from 'styled-components';

import type { SentenceQuestion } from '../../types';
import ProgressBarContainer from '../../components/progressBar/ProgressBarContainer';
import StageHeader from '../../components/stageHeader/StageHeader';
import QuestionCardContainer from '../../components/questionCard/QuestionCardContainer';

export interface SentenceCompletionPresenterProps {
  currentQuestion: SentenceQuestion;
  onNext: () => void;
  stageIcon: React.ReactNode;
}

const SentenceCompletion: React.FC<SentenceCompletionPresenterProps> = ({
  currentQuestion,
  onNext,
  stageIcon,
}) => {
  return (
    <SentenceCompletionWrapper>
      <ProgressBarContainer />
      <StageHeader
        title="Sentence Completion"
        description="Choose the word that best completes the sentence"
        icon={stageIcon}
      />
      <QuestionCardContainer
        key={currentQuestion.id}
        questionId={currentQuestion.id}
        questionText={currentQuestion.question}
        options={currentQuestion.options}
        correctAnswer={currentQuestion.correct_answer}
        hintHebrew={currentQuestion.hint_hebrew}
        onNext={onNext}
      />
    </SentenceCompletionWrapper>
  );
};

export default SentenceCompletion;

// ui-ux-pro-max: Claymorphism screen layout — cream background, large spacing, 200ms ease-out
const SentenceCompletionWrapper = styled.main`
  max-width: ${({ theme }) => theme.layout.contentWidth};
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.lg};
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  font-family: ${({ theme }) => theme.typography.fontFamily};
  box-sizing: border-box;

  @media (max-width: 480px) {
    padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.md};
  }
`;
