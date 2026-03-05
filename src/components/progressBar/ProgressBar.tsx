import React from 'react';
import styled from 'styled-components';

export interface ProgressBarPresenterProps {
  overallQuestion: number;
  totalQuestions: number;
  progress: number;
}

const ProgressBar: React.FC<ProgressBarPresenterProps> = ({
  overallQuestion,
  totalQuestions,
  progress,
}) => {
  return (
    <ProgressBarWrapper>
      <p className="progress-label">
        Question {overallQuestion} / {totalQuestions}
      </p>
      <div className="track" role="progressbar" aria-valuenow={overallQuestion} aria-valuemin={0} aria-valuemax={totalQuestions} aria-label={`Question ${overallQuestion} of ${totalQuestions}`}>
        <ProgressBarFill $progress={progress} />
      </div>
    </ProgressBarWrapper>
  );
};

export default ProgressBar;

// ------------------------------------------------------------
// Styled Components
// ------------------------------------------------------------

const ProgressBarWrapper = styled.div`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};

  .progress-label {
    font-family: ${({ theme }) => theme.typography.fontFamily};
    font-size: ${({ theme }) => theme.typography.hebrew};
    color: ${({ theme }) => theme.colors.textLight};
    margin: 0 0 ${({ theme }) => theme.spacing.xs} 0;
    line-height: ${({ theme }) => theme.typography.lineHeight};
    /* Left-aligned — compact utility bar, not a feature headline */
    text-align: left;
  }

  .track {
    width: 100%;
    height: 8px;
    background-color: ${({ theme }) => theme.colors.border};
    border-radius: 999px;
    overflow: hidden;
    /* Claymorphism: subtle inner shadow on the track */
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.12);
  }

`;

interface ProgressBarFillProps {
  $progress: number;
}

const ProgressBarFill = styled.div<ProgressBarFillProps>`
  height: 100%;
  width: ${({ $progress }) => $progress}%;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 999px;
  /* Smooth width transition — within ui-ux-pro-max 150-300ms window */
  transition: width 0.3s ease;

  /*
   * Honour prefers-reduced-motion: disable the width animation for users
   * who have requested reduced motion in their OS accessibility settings.
   */
  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;
