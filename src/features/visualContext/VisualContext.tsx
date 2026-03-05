import React from 'react';
import styled from 'styled-components';

import ProgressBarContainer from '../../components/progressBar/ProgressBarContainer';
import StageHeader from '../../components/stageHeader/StageHeader';
import QuestionCardContainer from '../../components/questionCard/QuestionCardContainer';
import type { VisualQuestion } from '../../types';

export interface VisualContextPresenterProps {
  currentQuestion: VisualQuestion;
  onNext: () => void;
  stageIcon: React.ReactNode;
}

const VisualContext: React.FC<VisualContextPresenterProps> = ({
  currentQuestion,
  onNext,
  stageIcon,
}) => {
  return (
    <VisualContextWrapper>
      <ProgressBarContainer />
      <StageHeader
        title="Visual Context"
        description="Read the situation and choose the best response"
        icon={stageIcon}
      />
      <QuestionCardContainer
        key={currentQuestion.id}
        questionId={currentQuestion.id}
        questionText={currentQuestion.prompt}
        options={currentQuestion.options}
        correctAnswer={currentQuestion.correct_answer}
        onNext={onNext}
      />
    </VisualContextWrapper>
  );
};

export default VisualContext;

// ui-ux-pro-max: Claymorphism — cream background, large spacing (48px+ gaps),
// 200ms ease-out transitions, max-width 800px centered per contentWidth token.
const VisualContextWrapper = styled.main`
  max-width: ${({ theme }) => theme.layout.contentWidth};
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};

  @media (max-width: 480px) {
    padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.md};
    gap: ${({ theme }) => theme.spacing.lg};
  }
`;
