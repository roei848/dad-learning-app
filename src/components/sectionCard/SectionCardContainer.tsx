import React from 'react';
import { AlertCircle, Briefcase, Camera, Car, ChefHat, CircleDot, Coffee, Dumbbell, Hotel, House, Landmark, MessageSquare, Pill, Plane, PlaneTakeoff, ShoppingBag, ShoppingCart, Shirt, Stethoscope, Target, Trophy, UtensilsCrossed, Waves } from 'lucide-react';

import { useAppSelector } from '../../app/hooks';
import type { Difficulty } from '../../types';
import SectionCard from './SectionCard';

export interface SectionCardContainerProps {
  sectionId: string;
  title: string;
  category: string;
  icon: string;
  difficulty: Difficulty;
  onStart: (sectionId: string) => void;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  UtensilsCrossed: <UtensilsCrossed size={48} />,
  Plane: <Plane size={48} />,
  Trophy: <Trophy size={48} />,
  Hotel: <Hotel size={48} />,
  Car: <Car size={48} />,
  PlaneTakeoff: <PlaneTakeoff size={48} />,
  Camera: <Camera size={48} />,
  ShoppingBag: <ShoppingBag size={48} />,
  AlertCircle: <AlertCircle size={48} />,
  Waves: <Waves size={48} />,
  CircleDot: <CircleDot size={48} />,
  Target: <Target size={48} />,
  Dumbbell: <Dumbbell size={48} />,
  ShoppingCart: <ShoppingCart size={48} />,
  Stethoscope: <Stethoscope size={48} />,
  House: <House size={48} />,
  Shirt: <Shirt size={48} />,
  Coffee: <Coffee size={48} />,
  Landmark: <Landmark size={48} />,
  Pill: <Pill size={48} />,
  Briefcase: <Briefcase size={48} />,
  ChefHat: <ChefHat size={48} />,
  MessageSquare: <MessageSquare size={48} />,
};

const SectionCardContainer: React.FC<SectionCardContainerProps> = ({
  sectionId,
  title,
  category,
  icon,
  difficulty,
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
      difficulty={difficulty}
      score={completionResult?.score}
      totalQuestions={completionResult?.totalQuestions}
      onClick={handleClick}
    />
  );
};

export default SectionCardContainer;
