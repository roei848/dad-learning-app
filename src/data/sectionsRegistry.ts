import airportData from './airport.json';
import beachData from './beach.json';
import emergencyData from './emergency.json';
import footballData from './football.json';
import hotelData from './hotel.json';
import planeData from './plane.json';
import restaurantData from './restaurant.json';
import shoppingData from './shopping.json';
import sightseeingData from './sightseeing.json';
import transportationData from './transportation.json';
import type { Section } from '../types';

const sectionsRegistry: Record<string, Section> = {
  [restaurantData.section_id]: restaurantData as unknown as Section,
  [footballData.section_id]: footballData as unknown as Section,
  [airportData.section_id]: airportData as unknown as Section,
  [hotelData.section_id]: hotelData as unknown as Section,
  [transportationData.section_id]: transportationData as unknown as Section,
  [planeData.section_id]: planeData as unknown as Section,
  [sightseeingData.section_id]: sightseeingData as unknown as Section,
  [shoppingData.section_id]: shoppingData as unknown as Section,
  [emergencyData.section_id]: emergencyData as unknown as Section,
  [beachData.section_id]: beachData as unknown as Section,
};

export default sectionsRegistry;
