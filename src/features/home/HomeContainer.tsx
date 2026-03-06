import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import footballData from '../../data/football.json';
import restaurantData from '../../data/restaurant.json';
import { loadSections } from '../../store/sectionsSlice';
import { startSection } from '../../store/sessionSlice';
import type { SectionMeta } from '../../types';
import Home from './Home';

interface HomeContainerProps {}

const HomeContainer: React.FC<HomeContainerProps> = () => {
  const dispatch = useAppDispatch();
  const sections = useAppSelector(state => state.sections.sections);

  useEffect(() => {
    const sectionsMeta: SectionMeta[] = [
      {
        section_id: restaurantData.section_id,
        title: restaurantData.title,
        category: restaurantData.category,
        icon: 'UtensilsCrossed',
      },
      {
        section_id: footballData.section_id,
        title: footballData.title,
        category: footballData.category,
        icon: 'Trophy',
      },
    ];
    dispatch(loadSections(sectionsMeta));
  }, []);

  const handleStartSection = (sectionId: string) => {
    dispatch(startSection(sectionId));
  };

  return <Home sections={sections} onStartSection={handleStartSection} />;
};

export default HomeContainer;
