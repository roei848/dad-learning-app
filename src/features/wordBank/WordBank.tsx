import React from 'react';
import { ArrowLeft } from 'lucide-react';
import styled from 'styled-components';

import StageHeader from '../../components/stageHeader/StageHeader';
import WordCardContainer from '../../components/wordCard/WordCardContainer';
import type { WordBankItem } from '../../types';

export interface WordBankPresenterProps {
  wordBank: WordBankItem[];
  onStartLearning: () => void;
  onExit: () => void;
  icon: React.ReactNode;
}

const WordBank: React.FC<WordBankPresenterProps> = ({
  wordBank,
  onStartLearning,
  onExit,
  icon,
}) => {
  return (
    <WordBankWrapper>
      <button className="word-bank__back-btn" onClick={onExit} type="button">
        <ArrowLeft size={18} />
        <span>Back</span>
      </button>

      <StageHeader
        title="Word Bank"
        description="Learn these words before starting the exercises"
        icon={icon}
      />

      <div className="word-bank__grid">
        {wordBank.map((item) => (
          <WordCardContainer
            key={item.word}
            word={item.word}
            translation={item.translation}
            example={item.example}
          />
        ))}
      </div>

      <button
        className="word-bank__start-btn"
        onClick={onStartLearning}
        type="button"
      >
        Start Learning
      </button>
    </WordBankWrapper>
  );
};

export default WordBank;

// ui-ux-pro-max: Claymorphism — soft layered shadows, 12px radius, 200ms ease-out
// Grid layout: 3 columns, large gaps per ui-ux-pro-max portfolio-grid recommendation
// Bold hover on CTA: color shift + shadow lift per ui-ux-pro-max vibrant block style
const WordBankWrapper = styled.main`
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.xl};

  .word-bank__back-btn {
    display: inline-flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.sm};
    margin-bottom: ${({ theme }) => theme.spacing.xl};
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
    background: ${({ theme }) => theme.colors.cardBackground};
    border: none;
    border-radius: 999px;
    box-shadow: ${({ theme }) => theme.shadow};
    cursor: pointer;
    font-family: ${({ theme }) => theme.typography.fontFamily};
    font-size: 18px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.primary};
    transition: box-shadow ${({ theme }) => theme.transition},
      transform ${({ theme }) => theme.transition};

    &:hover {
      box-shadow: ${({ theme }) => theme.shadowHover};
      transform: translateX(-2px);
    }
  }

  .word-bank__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: ${({ theme }) => theme.spacing.lg};
  }

  .word-bank__start-btn {
    display: block;
    width: 100%;
    margin-top: ${({ theme }) => theme.spacing.xxl};
    padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xl};
    background: ${({ theme }) => theme.colors.primary};
    color: #ffffff;
    font-family: ${({ theme }) => theme.typography.fontFamily};
    font-size: ${({ theme }) => theme.typography.subheading};
    font-weight: 700;
    border: none;
    border-radius: ${({ theme }) => theme.borderRadius};
    cursor: pointer;
    /* ui-ux-pro-max: Claymorphism soft outer shadow + smooth 200ms ease-out press */
    box-shadow:
      0 4px 12px rgba(107, 143, 113, 0.35),
      0 1px 3px rgba(107, 143, 113, 0.2);
    transition: background ${({ theme }) => theme.transition},
      box-shadow ${({ theme }) => theme.transition},
      transform ${({ theme }) => theme.transition};

    &:hover {
      background: #5a7d60;
      box-shadow:
        0 6px 20px rgba(107, 143, 113, 0.45),
        0 2px 6px rgba(107, 143, 113, 0.25);
      transform: translateY(-2px);
    }

    &:active {
      transform: translateY(0);
      box-shadow:
        0 2px 8px rgba(107, 143, 113, 0.3),
        0 1px 2px rgba(107, 143, 113, 0.15);
    }

    &:focus-visible {
      outline: 3px solid ${({ theme }) => theme.colors.primary};
      outline-offset: 3px;
    }
  }

  @media (max-width: 900px) {
    .word-bank__grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 560px) {
    padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.md};

    .word-bank__grid {
      grid-template-columns: 1fr;
    }

    .word-bank__start-btn {
      font-size: ${({ theme }) => theme.typography.body};
    }
  }
`;
