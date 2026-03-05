import React from 'react';
import { UtensilsCrossed, Plane, Trophy } from 'lucide-react';

import { useAppSelector } from '../../app/hooks';
import SectionCard from './SectionCard';

export interface SectionCardContainerProps {
  sectionId: string;
  title: string;
  category: string;
  icon: string;
  onStart: (sectionId: string) => void;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  UtensilsCrossed: <UtensilsCrossed size={48} />,
  Plane: <Plane size={48} />,
  Trophy: <Trophy size={48} />,
};

const SectionCardContainer: React.FC<SectionCardContainerProps> = ({
  sectionId,
  title,
  category,
  icon,
  onStart,
}) => {
  const completedSections = useAppSelector(state => state.sections.completedSections);

  const completionResult = completedSections[sectionId] ?? null;
  const isCompleted = completionResult !== null;
  const iconElement = ICON_MAP[icon] ?? <UtensilsCrossed size={48} />;

  const handleClick = () => {
    onStart(sectionId);
  };

  return (
    <SectionCard
      title={title}
      category={category}
      icon={iconElement}
      isCompleted={isCompleted}
      score={completionResult?.score}
      totalQuestions={completionResult?.totalQuestions}
      onClick={handleClick}
    />
  );
};

export default SectionCardContainer;
