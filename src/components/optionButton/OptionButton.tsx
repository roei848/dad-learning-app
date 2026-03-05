import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import styled, { css } from 'styled-components';

interface OptionButtonPresenterProps {
  label: string;
  state: 'default' | 'selected' | 'correct' | 'wrong';
  isDisabled: boolean;
  onClick: () => void;
}

const OptionButton: React.FC<OptionButtonPresenterProps> = ({
  label,
  state,
  isDisabled,
  onClick,
}) => {
  return (
    <OptionButtonWrapper
      onClick={onClick}
      disabled={isDisabled}
      data-state={state}
      aria-pressed={state === 'selected' || state === 'correct' || state === 'wrong'}
    >
      <span className="option-label">{label}</span>
      {state === 'correct' && (
        <CheckCircle className="option-icon" aria-hidden="true" size={24} />
      )}
      {state === 'wrong' && (
        <XCircle className="option-icon" aria-hidden="true" size={24} />
      )}
    </OptionButtonWrapper>
  );
};

export default OptionButton;

// --- Styled Components ---

const stateStyles = {
  default: css`
    background: ${({ theme }) => theme.colors.cardBackground};
    border: 2px solid ${({ theme }) => theme.colors.border};
    color: ${({ theme }) => theme.colors.text};

    &:not(:disabled):hover {
      border-color: ${({ theme }) => theme.colors.secondary};
      background: rgba(91, 140, 184, 0.06);
      box-shadow: ${({ theme }) => theme.shadowHover};
      transform: translateY(-1px);
    }

    &:not(:disabled):active {
      transform: translateY(0);
      box-shadow: ${({ theme }) => theme.shadow};
    }
  `,

  selected: css`
    background: rgba(91, 140, 184, 0.1);
    border: 2px solid ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.text};

    &:not(:disabled):hover {
      background: rgba(91, 140, 184, 0.16);
      box-shadow: ${({ theme }) => theme.shadowHover};
      transform: translateY(-1px);
    }

    &:not(:disabled):active {
      transform: translateY(0);
      box-shadow: ${({ theme }) => theme.shadow};
    }
  `,

  correct: css`
    background: ${({ theme }) => theme.colors.correct};
    border: 2px solid ${({ theme }) => theme.colors.correct};
    color: #ffffff;
    box-shadow: 0 4px 14px rgba(76, 175, 80, 0.35);
  `,

  wrong: css`
    background: ${({ theme }) => theme.colors.wrong};
    border: 2px solid ${({ theme }) => theme.colors.wrong};
    color: #ffffff;
    box-shadow: 0 4px 14px rgba(229, 115, 115, 0.35);
  `,
};

const OptionButtonWrapper = styled.button<{ 'data-state': string; disabled: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-height: 56px;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius};
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: ${({ theme }) => theme.typography.body};
  line-height: ${({ theme }) => theme.typography.lineHeight};
  font-weight: 500;
  text-align: left;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  transition: background ${({ theme }) => theme.transition},
    border-color ${({ theme }) => theme.transition},
    box-shadow ${({ theme }) => theme.transition},
    transform ${({ theme }) => theme.transition},
    color ${({ theme }) => theme.transition};
  box-shadow: ${({ theme }) => theme.shadow};

  /* Claymorphism inner shadow for depth */
  box-shadow: ${({ theme }) => theme.shadow},
    inset 0 1px 0 rgba(255, 255, 255, 0.6);

  /* Focus ring for keyboard navigation */
  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.secondary};
    outline-offset: 2px;
  }

  /* Apply state-specific styles */
  ${({ 'data-state': state }) => {
    switch (state) {
      case 'selected':
        return stateStyles.selected;
      case 'correct':
        return stateStyles.correct;
      case 'wrong':
        return stateStyles.wrong;
      default:
        return stateStyles.default;
    }
  }}

  .option-label {
    flex: 1;
  }

  .option-icon {
    flex-shrink: 0;
    margin-left: ${({ theme }) => theme.spacing.md};
  }

  /* Respect reduced-motion preference */
  @media (prefers-reduced-motion: reduce) {
    transition: none;
    transform: none !important;
  }
`;
