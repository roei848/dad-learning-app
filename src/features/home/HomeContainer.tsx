import React, { useEffect, useMemo, useState } from 'react';
import { Coffee, Globe, Trophy } from 'lucide-react';
import Home from './Home';
import beachData from '../../data/travel/beach.json';
import hotelData from '../../data/travel/hotel.json';
import planeData from '../../data/travel/plane.json';
import airportData from '../../data/travel/airport.json';
import footballData from '../../data/sport/football.json';
import football02Data from '../../data/sport/football_02.json';
import football03Data from '../../data/sport/football_03.json';
import basketball01Data from '../../data/sport/basketball_01.json';
import basketball02Data from '../../data/sport/basketball_02.json';
import basketball03Data from '../../data/sport/basketball_03.json';
import tennis01Data from '../../data/sport/tennis_01.json';
import tennis02Data from '../../data/sport/tennis_02.json';
import swimming01Data from '../../data/sport/swimming_01.json';
import swimming02Data from '../../data/sport/swimming_02.json';
import generalTraining01Data from '../../data/sport/general_training_01.json';
import generalTraining02Data from '../../data/sport/general_training_02.json';
import generalTraining03Data from '../../data/sport/general_training_03.json';
import generalTraining04Data from '../../data/sport/general_training_04.json';
import shoppingData from '../../data/travel/shopping.json';
import emergencyData from '../../data/travel/emergency.json';
import sightseeingData from '../../data/travel/sightseeing.json';
import restaurantData from '../../data/lifestyle/restaurant.json';
import restaurant02Data from '../../data/lifestyle/restaurant_02.json';
import supermarket01Data from '../../data/lifestyle/supermarket_01.json';
import doctor01Data from '../../data/lifestyle/doctor_01.json';
import homeChores01Data from '../../data/lifestyle/home_chores_01.json';
import wardrobe01Data from '../../data/lifestyle/wardrobe_01.json';
import cafe01Data from '../../data/lifestyle/cafe_01.json';
import bank01Data from '../../data/lifestyle/bank_01.json';
import pharmacy01Data from '../../data/lifestyle/pharmacy_01.json';
import jobInterview01Data from '../../data/lifestyle/job_interview_01.json';
import cooking01Data from '../../data/lifestyle/cooking_01.json';
import idioms01Data from '../../data/lifestyle/idioms_01.json';
import transportationData from '../../data/travel/transportation.json';
import type { CategoryMeta, Difficulty, SectionMeta } from '../../types';
import { startSection } from '../../store/sessionSlice';
import { loadSections } from '../../store/sectionsSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  Travel: <Globe size={48} />,
  Sport: <Trophy size={48} />,
  Lifestyle: <Coffee size={48} />,
  'Daily Life': <Coffee size={48} />,
};

const HomeContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const sections = useAppSelector(state => state.sections.sections);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

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
        section_id: restaurant02Data.section_id,
        title: restaurant02Data.title,
        category: restaurant02Data.category,
        icon: 'UtensilsCrossed',
        difficulty: restaurant02Data.difficulty as Difficulty,
      },
      {
        section_id: supermarket01Data.section_id,
        title: supermarket01Data.title,
        category: supermarket01Data.category,
        icon: 'ShoppingCart',
        difficulty: supermarket01Data.difficulty as Difficulty,
      },
      {
        section_id: doctor01Data.section_id,
        title: doctor01Data.title,
        category: doctor01Data.category,
        icon: 'Stethoscope',
        difficulty: doctor01Data.difficulty as Difficulty,
      },
      {
        section_id: homeChores01Data.section_id,
        title: homeChores01Data.title,
        category: homeChores01Data.category,
        icon: 'House',
        difficulty: homeChores01Data.difficulty as Difficulty,
      },
      {
        section_id: wardrobe01Data.section_id,
        title: wardrobe01Data.title,
        category: wardrobe01Data.category,
        icon: 'Shirt',
        difficulty: wardrobe01Data.difficulty as Difficulty,
      },
      {
        section_id: cafe01Data.section_id,
        title: cafe01Data.title,
        category: cafe01Data.category,
        icon: 'Coffee',
        difficulty: cafe01Data.difficulty as Difficulty,
      },
      {
        section_id: bank01Data.section_id,
        title: bank01Data.title,
        category: bank01Data.category,
        icon: 'Landmark',
        difficulty: bank01Data.difficulty as Difficulty,
      },
      {
        section_id: pharmacy01Data.section_id,
        title: pharmacy01Data.title,
        category: pharmacy01Data.category,
        icon: 'Pill',
        difficulty: pharmacy01Data.difficulty as Difficulty,
      },
      {
        section_id: jobInterview01Data.section_id,
        title: jobInterview01Data.title,
        category: jobInterview01Data.category,
        icon: 'Briefcase',
        difficulty: jobInterview01Data.difficulty as Difficulty,
      },
      {
        section_id: cooking01Data.section_id,
        title: cooking01Data.title,
        category: cooking01Data.category,
        icon: 'ChefHat',
        difficulty: cooking01Data.difficulty as Difficulty,
      },
      {
        section_id: idioms01Data.section_id,
        title: idioms01Data.title,
        category: idioms01Data.category,
        icon: 'MessageSquare',
        difficulty: idioms01Data.difficulty as Difficulty,
      },
      {
        section_id: footballData.section_id,
        title: footballData.title,
        category: footballData.category,
        icon: 'Trophy',
        difficulty: footballData.difficulty as Difficulty,
      },
      {
        section_id: football02Data.section_id,
        title: football02Data.title,
        category: football02Data.category,
        icon: 'Trophy',
        difficulty: football02Data.difficulty as Difficulty,
      },
      {
        section_id: football03Data.section_id,
        title: football03Data.title,
        category: football03Data.category,
        icon: 'Trophy',
        difficulty: football03Data.difficulty as Difficulty,
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
      {
        section_id: basketball01Data.section_id,
        title: basketball01Data.title,
        category: basketball01Data.category,
        icon: 'CircleDot',
        difficulty: basketball01Data.difficulty as Difficulty,
      },
      {
        section_id: basketball02Data.section_id,
        title: basketball02Data.title,
        category: basketball02Data.category,
        icon: 'CircleDot',
        difficulty: basketball02Data.difficulty as Difficulty,
      },
      {
        section_id: basketball03Data.section_id,
        title: basketball03Data.title,
        category: basketball03Data.category,
        icon: 'CircleDot',
        difficulty: basketball03Data.difficulty as Difficulty,
      },
      {
        section_id: tennis01Data.section_id,
        title: tennis01Data.title,
        category: tennis01Data.category,
        icon: 'Target',
        difficulty: tennis01Data.difficulty as Difficulty,
      },
      {
        section_id: tennis02Data.section_id,
        title: tennis02Data.title,
        category: tennis02Data.category,
        icon: 'Target',
        difficulty: tennis02Data.difficulty as Difficulty,
      },
      {
        section_id: swimming01Data.section_id,
        title: swimming01Data.title,
        category: swimming01Data.category,
        icon: 'Waves',
        difficulty: swimming01Data.difficulty as Difficulty,
      },
      {
        section_id: swimming02Data.section_id,
        title: swimming02Data.title,
        category: swimming02Data.category,
        icon: 'Waves',
        difficulty: swimming02Data.difficulty as Difficulty,
      },
      {
        section_id: generalTraining01Data.section_id,
        title: generalTraining01Data.title,
        category: generalTraining01Data.category,
        icon: 'Dumbbell',
        difficulty: generalTraining01Data.difficulty as Difficulty,
      },
      {
        section_id: generalTraining02Data.section_id,
        title: generalTraining02Data.title,
        category: generalTraining02Data.category,
        icon: 'Dumbbell',
        difficulty: generalTraining02Data.difficulty as Difficulty,
      },
      {
        section_id: generalTraining03Data.section_id,
        title: generalTraining03Data.title,
        category: generalTraining03Data.category,
        icon: 'Dumbbell',
        difficulty: generalTraining03Data.difficulty as Difficulty,
      },
      {
        section_id: generalTraining04Data.section_id,
        title: generalTraining04Data.title,
        category: generalTraining04Data.category,
        icon: 'Dumbbell',
        difficulty: generalTraining04Data.difficulty as Difficulty,
      },
    ];
    dispatch(loadSections(sectionsMeta));
  }, []);

  const categories: CategoryMeta[] = useMemo(() => {
    const grouped = sections.reduce<Record<string, number>>((acc, section) => {
      acc[section.category] = (acc[section.category] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(grouped).map(([name, count]) => ({
      name,
      icon: CATEGORY_ICONS[name] || <Globe size={48} />,
      sectionCount: count,
    }));
  }, [sections]);

  const DIFFICULTY_ORDER: Record<string, number> = { easy: 0, medium: 1, hard: 2 };

  const filteredSections = useMemo(() => {
    if (!selectedCategory) return [];
    return sections
      .filter(s => s.category === selectedCategory)
      .sort((a, b) => {
        const diffA = DIFFICULTY_ORDER[a.difficulty] ?? 99;
        const diffB = DIFFICULTY_ORDER[b.difficulty] ?? 99;
        if (diffA !== diffB) return diffA - diffB;
        return a.title.localeCompare(b.title);
      });
  }, [sections, selectedCategory]);

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
  };

  const handleStartSection = (sectionId: string) => {
    dispatch(startSection(sectionId));
  };

  return (
    <Home
      selectedCategory={selectedCategory}
      categories={categories}
      sections={filteredSections}
      onSelectCategory={handleSelectCategory}
      onBackToCategories={handleBackToCategories}
      onStartSection={handleStartSection}
    />
  );
};

export default HomeContainer;
