import footballData from './football.json';
import restaurantData from './restaurant.json';
import type { Section } from '../types';

const sectionsRegistry: Record<string, Section> = {
  [restaurantData.section_id]: restaurantData as unknown as Section,
  [footballData.section_id]: footballData as unknown as Section,
};

export default sectionsRegistry;
