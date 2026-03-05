import React from 'react';
import { HelpCircle } from 'lucide-react';
import styled from 'styled-components';

export interface HebrewHintPresenterProps {
  hint: string;
  isVisible: boolean;
  onToggle: () => void;
}

const HebrewHint: React.FC<HebrewHintPresenterProps> = ({ hint, isVisible, onToggle }) => {
  return (
    <HebrewHintWrapper>
      <button
        className="hebrew-hint__toggle"
        onClick={onToggle}
        aria-label={isVisible ? 'Hide Hebrew hint' : 'Show Hebrew hint'}
        aria-expanded={isVisible}
        type="button"
      >
        <HelpCircle size={20} />
      </button>

      {/* Bubble renders in DOM always; opacity/height animated for smooth reveal */}
      <div
        className={`hebrew-hint__bubble${isVisible ? ' hebrew-hint__bubble--visible' : ''}`}
        aria-live="polite"
        aria-hidden={!isVisible}
      >
        <p className="hebrew-hint__text">{hint}</p>
      </div>
    </HebrewHintWrapper>
  );
};

export default HebrewHint;

// ui-ux-pro-max: Claymorphism — soft bubble with inner shadow, smooth 200ms ease-out fade
const HebrewHintWrapper = styled.div`
  display: inline-flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.sm};

  .hebrew-hint__toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    /* ui-ux-pro-max: 44x44px minimum touch target */
    min-width: 44px;
    min-height: 44px;
    padding: ${({ theme }) => theme.spacing.sm};
    background: ${({ theme }) => theme.colors.cardBackground};
    border: 1.5px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius};
    color: ${({ theme }) => theme.colors.primary};
    cursor: pointer;
    transition: all ${({ theme }) => theme.transition};
    /* ui-ux-pro-max: outer soft shadow */
    box-shadow: ${({ theme }) => theme.shadow};

    &:hover {
      box-shadow: ${({ theme }) => theme.shadowHover};
      border-color: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.primary};
    }

    /* ui-ux-pro-max: visible focus ring for keyboard nav */
    &:focus-visible {
      outline: 2px solid ${({ theme }) => theme.colors.primary};
      outline-offset: 2px;
    }

    &:active {
      transform: scale(0.96);
    }
  }

  .hebrew-hint__bubble {
    /* Smooth reveal: opacity + max-height animation for prefers-reduced-motion compliance */
    max-height: 0;
    overflow: hidden;
    opacity: 0;
    padding: 0 ${({ theme }) => theme.spacing.md};
    background: ${({ theme }) => theme.colors.background};
    border: 1.5px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius};
    /* ui-ux-pro-max: inner shadow for Claymorphism depth */
    box-shadow:
      inset 0 2px 4px rgba(0, 0, 0, 0.06),
      ${({ theme }) => theme.shadow};
    transition:
      opacity ${({ theme }) => theme.transition},
      max-height ${({ theme }) => theme.transition},
      padding ${({ theme }) => theme.transition};
    pointer-events: none;

    &.hebrew-hint__bubble--visible {
      max-height: 200px;
      opacity: 1;
      padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
      pointer-events: auto;
    }
  }

  .hebrew-hint__text {
    margin: 0;
    font-family: ${({ theme }) => theme.typography.fontFamily};
    font-size: ${({ theme }) => theme.typography.hebrew};
    color: ${({ theme }) => theme.colors.text};
    line-height: ${({ theme }) => theme.typography.lineHeight};
    /* Hebrew RTL */
    direction: rtl;
    text-align: right;
    white-space: nowrap;
  }

  /* ui-ux-pro-max: respect prefers-reduced-motion */
  @media (prefers-reduced-motion: reduce) {
    .hebrew-hint__bubble {
      transition: opacity ${({ theme }) => theme.transition};
    }

    .hebrew-hint__toggle:active {
      transform: none;
    }
  }
`;
