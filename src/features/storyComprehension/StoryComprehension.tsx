import React from 'react';
import styled from 'styled-components';

import type { StoryQuestion } from '../../types';
import ProgressBarContainer from '../../components/progressBar/ProgressBarContainer';
import StageHeader from '../../components/stageHeader/StageHeader';
import QuestionCardContainer from '../../components/questionCard/QuestionCardContainer';

export interface StoryComprehensionPresenterProps {
  storyText: string;
  currentQuestion: StoryQuestion;
  onNext: () => void;
  stageIcon: React.ReactNode;
}

const StoryComprehension: React.FC<StoryComprehensionPresenterProps> = ({
  storyText,
  currentQuestion,
  onNext,
  stageIcon,
}) => {
  return (
    <StoryComprehensionWrapper>
      <ProgressBarContainer />
      <StageHeader
        title="Story Comprehension"
        description="Read the story, then answer the questions"
        icon={stageIcon}
      />
      <div className="story-text">
        {storyText}
      </div>
      <QuestionCardContainer
        key={currentQuestion.id}
        questionId={currentQuestion.id}
        questionText={currentQuestion.question}
        options={currentQuestion.options}
        correctAnswer={currentQuestion.correct_answer}
        onNext={onNext}
      />
    </StoryComprehensionWrapper>
  );
};

export default StoryComprehension;

// ui-ux-pro-max: Claymorphism screen layout — cream background, story card with soft shadow,
// large 48px gaps, Georgia serif, 200ms ease-out. Story text always visible above questions
// so the learner can reference the passage while answering each comprehension question.
const StoryComprehensionWrapper = styled.main`
  max-width: ${({ theme }) => theme.layout.storyWidth};
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.lg};
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  font-family: ${({ theme }) => theme.typography.fontFamily};
  box-sizing: border-box;

  .story-text {
    font-family: ${({ theme }) => theme.typography.fontFamily};
    font-size: ${({ theme }) => theme.typography.story};
    line-height: ${({ theme }) => theme.typography.lineHeight};
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.cardBackground};
    border-radius: ${({ theme }) => theme.borderRadius};
    box-shadow: ${({ theme }) => theme.shadow};
    padding: ${({ theme }) => theme.spacing.xl};
    margin-bottom: ${({ theme }) => theme.spacing.xl};
    /* Preserve paragraph breaks from the source text */
    white-space: pre-wrap;
  }

  @media (max-width: 480px) {
    padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.md};

    .story-text {
      font-size: ${({ theme }) => theme.typography.body};
      padding: ${({ theme }) => theme.spacing.md};
    }
  }
`;
