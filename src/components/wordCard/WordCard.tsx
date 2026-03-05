import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Volume2 } from 'lucide-react';

export interface WordCardPresenterProps {
  word: string;
  translation: string;
  example: string;
  onPlayAudio: () => void;
  isPlaying: boolean;
}

const WordCard: React.FC<WordCardPresenterProps> = ({
  word,
  translation,
  example,
  onPlayAudio,
  isPlaying,
}) => {
  return (
    <WordCardWrapper>
      <div className="word-card__header">
        <span className="word-card__word">{word}</span>
        <button
          className="word-card__audio-btn"
          onClick={onPlayAudio}
          type="button"
          aria-label="Play pronunciation"
          aria-pressed={isPlaying}
        >
          <Volume2
            className={isPlaying ? 'word-card__audio-icon--playing' : 'word-card__audio-icon'}
            size={22}
            aria-hidden="true"
          />
        </button>
      </div>

      <p className="word-card__translation" lang="he">
        {translation}
      </p>

      <p className="word-card__example">{example}</p>
    </WordCardWrapper>
  );
};

export default WordCard;

// ui-ux-pro-max: Claymorphism — white card with soft layered outer shadows,
// hover lift via shadowHover + translateY(-2px), smooth 200ms ease-out.
// Audio icon pulses via opacity animation when speech is active.
const pulseOpacity = keyframes`
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.45; }
`;

const WordCardWrapper = styled.div`
  background: ${({ theme }) => theme.colors.cardBackground};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadow};
  padding: ${({ theme }) => theme.spacing.xl};
  width: 100%;
  transition: box-shadow ${({ theme }) => theme.transition},
              transform   ${({ theme }) => theme.transition};

  /* ui-ux-pro-max: Claymorphism hover lift */
  &:hover {
    box-shadow: ${({ theme }) => theme.shadowHover};
    transform: translateY(-2px);
  }

  .word-card__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: ${({ theme }) => theme.spacing.md};
    gap: ${({ theme }) => theme.spacing.sm};
  }

  .word-card__word {
    font-family: ${({ theme }) => theme.typography.fontFamily};
    /* ui-ux-pro-max: use heading (32px) for maximum prominence on the primary word */
    font-size: ${({ theme }) => theme.typography.heading};
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.2;
  }

  .word-card__audio-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    /* ui-ux-pro-max: minimum 44×44px touch target */
    width: 44px;
    height: 44px;
    flex-shrink: 0;
    background: transparent;
    border: 2px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius};
    cursor: pointer;
    color: ${({ theme }) => theme.colors.primary};
    transition: all ${({ theme }) => theme.transition};

    &:hover {
      background: ${({ theme }) => theme.colors.primary};
      border-color: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.cardBackground};
      box-shadow: ${({ theme }) => theme.shadowHover};
    }

    &:active {
      transform: scale(0.96);
    }

    /* ui-ux-pro-max: visible focus ring for keyboard nav */
    &:focus-visible {
      outline: 2px solid ${({ theme }) => theme.colors.primary};
      outline-offset: 3px;
    }
  }

  .word-card__audio-icon {
    display: block;
  }

  /* ui-ux-pro-max: pulse animation signals active speech synthesis */
  .word-card__audio-icon--playing {
    display: block;
    animation: ${pulseOpacity} 900ms ease-in-out infinite;
  }

  .word-card__translation {
    /* Hebrew: right-to-left, right-aligned */
    direction: rtl;
    text-align: right;
    font-family: ${({ theme }) => theme.typography.fontFamily};
    font-size: ${({ theme }) => theme.typography.hebrew};
    font-weight: 600;
    color: ${({ theme }) => theme.colors.secondary};
    margin: 0 0 ${({ theme }) => theme.spacing.md};
    line-height: ${({ theme }) => theme.typography.lineHeight};
  }

  .word-card__example {
    font-family: ${({ theme }) => theme.typography.fontFamily};
    font-size: ${({ theme }) => theme.typography.body};
    font-style: italic;
    color: ${({ theme }) => theme.colors.textLight};
    margin: 0;
    line-height: ${({ theme }) => theme.typography.lineHeight};
  }

  /* ui-ux-pro-max: respect prefers-reduced-motion */
  @media (prefers-reduced-motion: reduce) {
    transition: none;

    &:hover {
      transform: none;
    }

    .word-card__audio-btn {
      transition: background-color ${({ theme }) => theme.transition},
                  color            ${({ theme }) => theme.transition};

      &:active {
        transform: none;
      }
    }

    .word-card__audio-icon--playing {
      animation: none;
      opacity: 0.6;
    }
  }
`;
