import React from 'react';
import styled from 'styled-components';
import type { Difficulty } from '../../types';

interface DifficultyBadgeProps {
  difficulty: Difficulty;
}

const DIFFICULTY_COLORS: Record<Difficulty, string> = {
  easy: '#7FB069',
  medium: '#E6AC4F',
  hard: '#D4663A',
  extreme: '#C0392B',
};

const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
  extreme: 'Extreme',
};

const DifficultyBadge: React.FC<DifficultyBadgeProps> = ({ difficulty }) => {
  return (
    <DifficultyBadgeWrapper $color={DIFFICULTY_COLORS[difficulty]}>
      {DIFFICULTY_LABELS[difficulty]}
    </DifficultyBadgeWrapper>
  );
};

export default DifficultyBadge;

const DifficultyBadgeWrapper = styled.span<{ $color: string }>`
  display: inline-block;
  padding: 2px 10px;
  border-radius: 12px;
  background-color: ${({ $color }) => $color};
  color: #fff;
  font-family: Georgia, serif;
  font-size: 13px;
  font-weight: bold;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
  user-select: none;
`;
