import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import airportData from '../../data/airport.json';
import beachData from '../../data/beach.json';
import emergencyData from '../../data/emergency.json';
import footballData from '../../data/football.json';
import hotelData from '../../data/hotel.json';
import planeData from '../../data/plane.json';
import restaurantData from '../../data/restaurant.json';
import shoppingData from '../../data/shopping.json';
import sightseeingData from '../../data/sightseeing.json';
import transportationData from '../../data/transportation.json';
import { loadSections } from '../../store/sectionsSlice';
import { startSection } from '../../store/sessionSlice';
import type { Difficulty, SectionMeta } from '../../types';
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
        difficulty: restaurantData.difficulty as Difficulty,
      },
      {
        section_id: footballData.section_id,
        title: footballData.title,
        category: footballData.category,
        icon: 'Trophy',
        difficulty: footballData.difficulty as Difficulty,
      },
      {
        section_id: airportData.section_id,
        title: airportData.title,
        category: airportData.category,
        icon: 'Plane',
        difficulty: airportData.difficulty as Difficulty,
      },
      {
        section_id: hotelData.section_id,
        title: hotelData.title,
        category: hotelData.category,
        icon: 'Hotel',
        difficulty: hotelData.difficulty as Difficulty,
      },
      {
        section_id: transportationData.section_id,
        title: transportationData.title,
        category: transportationData.category,
        icon: 'Car',
        difficulty: transportationData.difficulty as Difficulty,
      },
      {
        section_id: planeData.section_id,
        title: planeData.title,
        category: planeData.category,
        icon: 'PlaneTakeoff',
        difficulty: planeData.difficulty as Difficulty,
      },
      {
        section_id: sightseeingData.section_id,
        title: sightseeingData.title,
        category: sightseeingData.category,
        icon: 'Camera',
        difficulty: sightseeingData.difficulty as Difficulty,
      },
      {
        section_id: shoppingData.section_id,
        title: shoppingData.title,
        category: shoppingData.category,
        icon: 'ShoppingBag',
        difficulty: shoppingData.difficulty as Difficulty,
      },
      {
        section_id: emergencyData.section_id,
        title: emergencyData.title,
        category: emergencyData.category,
        icon: 'AlertCircle',
        difficulty: emergencyData.difficulty as Difficulty,
      },
      {
        section_id: beachData.section_id,
        title: beachData.title,
        category: beachData.category,
        icon: 'Waves',
        difficulty: beachData.difficulty as Difficulty,
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
