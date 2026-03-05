import React from 'react';
import { CheckCircle } from 'lucide-react';
import styled from 'styled-components';

export interface SectionCardPresenterProps {
  title: string;
  category: string;
  icon: React.ReactNode;
  isCompleted: boolean;
  score?: number;
  totalQuestions?: number;
  onClick: () => void;
}

const SectionCard: React.FC<SectionCardPresenterProps> = ({
  title,
  category,
  icon,
  isCompleted,
  score,
  totalQuestions,
  onClick,
}) => {
  return (
    <SectionCardWrapper onClick={onClick}>
      {isCompleted && (
        <div className="completion-badge">
          <CheckCircle size={24} aria-label="Completed" />
          {score !== undefined && totalQuestions !== undefined && (
            <span className="score-text">{score}/{totalQuestions}</span>
          )}
        </div>
      )}

      <div className="icon-container">
        {icon}
      </div>

      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <span className="card-category">{category}</span>
      </div>
    </SectionCardWrapper>
  );
};

export default SectionCard;

const SectionCardWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  padding: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.cardBackground};
  border-radius: ${({ theme }) => theme.borderRadius};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadow};
  cursor: pointer;
  transition: transform ${({ theme }) => theme.transition},
              box-shadow ${({ theme }) => theme.transition};
  font-family: ${({ theme }) => theme.typography.fontFamily};
  gap: ${({ theme }) => theme.spacing.md};

  &:hover {
    transform: scale(1.02);
    box-shadow: ${({ theme }) => theme.shadowHover};
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }

  .completion-badge {
    position: absolute;
    top: ${({ theme }) => theme.spacing.md};
    right: ${({ theme }) => theme.spacing.md};
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.xs};
    color: ${({ theme }) => theme.colors.correct};
  }

  .score-text {
    font-size: 14px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.correct};
    font-family: ${({ theme }) => theme.typography.fontFamily};
  }

  .icon-container {
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.colors.primary};
  }

  .card-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.xs};
    text-align: center;
  }

  .card-title {
    margin: 0;
    font-size: ${({ theme }) => theme.typography.subheading};
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.typography.fontFamily};
    line-height: ${({ theme }) => theme.typography.lineHeight};
  }

  .card-category {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.textLight};
    font-family: ${({ theme }) => theme.typography.fontFamily};
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
`;
