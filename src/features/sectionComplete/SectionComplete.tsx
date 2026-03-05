import { Trophy } from 'lucide-react';
import styled, { keyframes } from 'styled-components';
import type { WordBankItem } from '../../types';

export interface SectionCompletePresenterProps {
  correctCount: number;
  totalQuestions: number;
  wordBank: WordBankItem[];
  onBackToHome: () => void;
}

const SectionComplete: React.FC<SectionCompletePresenterProps> = ({
  correctCount,
  totalQuestions,
  wordBank,
  onBackToHome,
}) => {
  const getScoreMessage = (): { text: string; level: 'excellent' | 'good' | 'practice' } => {
    if (correctCount >= 24) return { text: 'Excellent!', level: 'excellent' };
    if (correctCount >= 15) return { text: 'Good job!', level: 'good' };
    return { text: 'Keep practicing!', level: 'practice' };
  };

  const scoreMessage = getScoreMessage();

  return (
    <SectionCompleteWrapper>
      <div className="success-section">
        <div className="trophy-container">
          <Trophy size={80} className="trophy-icon" aria-label="Trophy" />
        </div>

        <h1 className="heading">Well Done, Dad!</h1>

        <p className="score-text">
          You got {correctCount} out of {totalQuestions} correct!
        </p>

        <p className={`score-message score-message--${scoreMessage.level}`}>
          {scoreMessage.text}
        </p>
      </div>

      <div className="word-review-section">
        <h2 className="word-review-heading">Words You Learned</h2>

        <ul className="word-list">
          {wordBank.map((item) => (
            <li key={item.word} className="word-row">
              <span className="word-english">{item.word}</span>
              <span className="word-separator"> — </span>
              <span className="word-hebrew">{item.translation}</span>
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        className="back-button"
        onClick={onBackToHome}
        aria-label="Back to Home"
      >
        Back to Home
      </button>
    </SectionCompleteWrapper>
  );
};

export default SectionComplete;

/* ─── Keyframes ─────────────────────────────────────────────────────────── */

const trophyBounce = keyframes`
  0%   { transform: translateY(0) scale(1); }
  30%  { transform: translateY(-18px) scale(1.08); }
  55%  { transform: translateY(0) scale(0.96); }
  75%  { transform: translateY(-8px) scale(1.03); }
  90%  { transform: translateY(0) scale(0.99); }
  100% { transform: translateY(0) scale(1); }
`;

const fadeSlideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

/* ─── Styled Component ───────────────────────────────────────────────────── */

const SectionCompleteWrapper = styled.div`
  max-width: ${({ theme }) => theme.layout.contentWidth};
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.lg};
  font-family: ${({ theme }) => theme.typography.fontFamily};
  color: ${({ theme }) => theme.colors.text};
  animation: ${fadeSlideUp} 0.4s ease-out both;

  /* ── Success section ── */

  .success-section {
    text-align: center;
    margin-bottom: ${({ theme }) => theme.spacing.xxl};
  }

  .trophy-container {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-bottom: ${({ theme }) => theme.spacing.lg};

    /* Respect user preference for reduced motion */
    @media (prefers-reduced-motion: no-preference) {
      .trophy-icon {
        animation: ${trophyBounce} 1s ease-out 0.3s both;
      }
    }
  }

  .trophy-icon {
    color: ${({ theme }) => theme.colors.primary};
    filter: drop-shadow(0 4px 12px rgba(107, 143, 113, 0.4));
  }

  .heading {
    font-size: ${({ theme }) => theme.typography.heading};
    font-weight: 700;
    color: ${({ theme }) => theme.colors.primary};
    margin: 0 0 ${({ theme }) => theme.spacing.md} 0;
    line-height: 1.2;
  }

  .score-text {
    font-size: ${({ theme }) => theme.typography.subheading};
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
    margin: 0 0 ${({ theme }) => theme.spacing.sm} 0;
    line-height: ${({ theme }) => theme.typography.lineHeight};
  }

  .score-message {
    font-size: ${({ theme }) => theme.typography.subheading};
    font-weight: 700;
    margin: 0;

    &--excellent {
      color: ${({ theme }) => theme.colors.correct};
    }

    &--good {
      color: ${({ theme }) => theme.colors.secondary};
    }

    &--practice {
      color: ${({ theme }) => theme.colors.textLight};
    }
  }

  /* ── Word review section ── */

  .word-review-section {
    background: ${({ theme }) => theme.colors.cardBackground};
    border-radius: ${({ theme }) => theme.borderRadius};
    box-shadow: ${({ theme }) => theme.shadow};
    padding: ${({ theme }) => theme.spacing.xl};
    margin-bottom: ${({ theme }) => theme.spacing.xl};
    text-align: left;
  }

  .word-review-heading {
    font-size: ${({ theme }) => theme.typography.heading};
    font-weight: 700;
    color: ${({ theme }) => theme.colors.primary};
    margin: 0 0 ${({ theme }) => theme.spacing.lg} 0;
    padding-bottom: ${({ theme }) => theme.spacing.sm};
    border-bottom: 2px solid ${({ theme }) => theme.colors.border};
  }

  .word-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.xl};
  }

  .word-row {
    padding: ${({ theme }) => theme.spacing.sm} 0;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    font-size: ${({ theme }) => theme.typography.body};
    line-height: ${({ theme }) => theme.typography.lineHeight};
    display: flex;
    align-items: baseline;
    flex-wrap: wrap;
    gap: 2px;
  }

  .word-english {
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text};
  }

  .word-separator {
    color: ${({ theme }) => theme.colors.textLight};
  }

  .word-hebrew {
    color: ${({ theme }) => theme.colors.textLight};
    font-size: ${({ theme }) => theme.typography.hebrew};
    direction: rtl;
    unicode-bidi: embed;
  }

  /* ── Back to Home button ── */

  .back-button {
    display: block;
    width: 100%;
    max-width: 360px;
    margin: ${({ theme }) => theme.spacing.xxl} auto 0;
    padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xxl};
    background: ${({ theme }) => theme.colors.primary};
    color: #ffffff;
    font-family: ${({ theme }) => theme.typography.fontFamily};
    font-size: ${({ theme }) => theme.typography.body};
    font-weight: 700;
    border: none;
    border-radius: ${({ theme }) => theme.borderRadius};
    /* Claymorphism: soft layered shadow + smooth press */
    box-shadow:
      0 4px 0 rgba(0, 0, 0, 0.15),
      0 6px 16px rgba(107, 143, 113, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
    cursor: pointer;
    transition:
      transform ${({ theme }) => theme.transition},
      box-shadow ${({ theme }) => theme.transition},
      background ${({ theme }) => theme.transition};

    &:hover {
      background: #5a7d60;
      box-shadow:
        0 6px 0 rgba(0, 0, 0, 0.15),
        0 10px 24px rgba(107, 143, 113, 0.35),
        inset 0 1px 0 rgba(255, 255, 255, 0.2);
      transform: translateY(-2px);
    }

    &:active {
      transform: translateY(2px);
      box-shadow:
        0 2px 0 rgba(0, 0, 0, 0.15),
        0 4px 8px rgba(107, 143, 113, 0.2),
        inset 0 1px 0 rgba(255, 255, 255, 0.1);
    }

    &:focus-visible {
      outline: 3px solid ${({ theme }) => theme.colors.secondary};
      outline-offset: 3px;
    }
  }
`;
