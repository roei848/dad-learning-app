import React from "react";
import {
  AlertCircle,
  Baby,
  BookOpen,
  Briefcase,
  Camera,
  Car,
  Carrot,
  ChefHat,
  CircleDot,
  Clapperboard,
  Coffee,
  Dumbbell,
  Film,
  Flower2,
  Gift,
  Heart,
  Hotel,
  House,
  Landmark,
  MessageCircle,
  MessageSquare,
  Mic2,
  Music,
  Palette,
  Pill,
  Plane,
  PlaneTakeoff,
  Scissors,
  ShoppingBag,
  ShoppingCart,
  Shirt,
  Sprout,
  Stethoscope,
  Sun,
  Target,
  Trophy,
  Tv,
  UtensilsCrossed,
  Users,
  Waves,
} from "lucide-react";

import SectionCard from "./SectionCard";
import type { Difficulty } from "../../types";
import { useAppSelector } from "../../app/hooks";

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
  Users: <Users size={48} />,
  Heart: <Heart size={48} />,
  Gift: <Gift size={48} />,
  Baby: <Baby size={48} />,
  MessageCircle: <MessageCircle size={48} />,
  Music: <Music size={48} />,
  Film: <Film size={48} />,
  Tv: <Tv size={48} />,
  Mic2: <Mic2 size={48} />,
  Clapperboard: <Clapperboard size={48} />,
  Palette: <Palette size={48} />,
  BookOpen: <BookOpen size={48} />,
  Sprout: <Sprout size={48} />,
  Flower2: <Flower2 size={48} />,
  Carrot: <Carrot size={48} />,
  Scissors: <Scissors size={48} />,
  Sun: <Sun size={48} />,
};

const SectionCardContainer: React.FC<SectionCardContainerProps> = ({
  sectionId,
  title,
  category,
  icon,
  difficulty,
  onStart,
}) => {
  const completedSections = useAppSelector(
    (state) => state.sections.completedSections,
  );

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
