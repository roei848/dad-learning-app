import React from 'react';
import { LogOut } from 'lucide-react';
import styled from 'styled-components';

import ExitConfirmModal from '../../components/exitConfirmModal/ExitConfirmModal';
import ProgressBarContainer from '../../components/progressBar/ProgressBarContainer';
import QuestionCardContainer from '../../components/questionCard/QuestionCardContainer';
import StageHeader from '../../components/stageHeader/StageHeader';
import type { SentenceQuestion } from '../../types';

export interface SentenceCompletionPresenterProps {
  currentQuestion: SentenceQuestion;
  onNext: () => void;
  stageIcon: React.ReactNode;
  showExitConfirm: boolean;
  onExitRequest: () => void;
  onExitConfirm: () => void;
  onExitCancel: () => void;
}

const SentenceCompletion: React.FC<SentenceCompletionPresenterProps> = ({
  currentQuestion,
  onNext,
  stageIcon,
  showExitConfirm,
  onExitRequest,
  onExitConfirm,
  onExitCancel,
}) => {
  return (
    <SentenceCompletionWrapper>
      <button className="exit-btn" onClick={onExitRequest} type="button">
        <LogOut size={18} />
        <span>Exit</span>
      </button>
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
      <ExitConfirmModal
        isOpen={showExitConfirm}
        onConfirm={onExitConfirm}
        onCancel={onExitCancel}
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

  .exit-btn {
    display: inline-flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.sm};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
    background: none;
    border: 1.5px solid ${({ theme }) => theme.colors.border};
    border-radius: 999px;
    cursor: pointer;
    font-family: ${({ theme }) => theme.typography.fontFamily};
    font-size: 16px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.textLight};
    transition: color ${({ theme }) => theme.transition},
      border-color ${({ theme }) => theme.transition};

    &:hover {
      color: ${({ theme }) => theme.colors.wrong};
      border-color: ${({ theme }) => theme.colors.wrong};
    }
  }

  @media (max-width: 480px) {
    padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.md};
  }
`;
