import type { Section } from '../types';
import beachData from './travel/beach.json';
import hotelData from './travel/hotel.json';
import planeData from './travel/plane.json';
import airportData from './travel/airport.json';
import footballData from './sport/football.json';
import football02Data from './sport/football_02.json';
import football03Data from './sport/football_03.json';
import basketball01Data from './sport/basketball_01.json';
import basketball02Data from './sport/basketball_02.json';
import basketball03Data from './sport/basketball_03.json';
import tennis01Data from './sport/tennis_01.json';
import tennis02Data from './sport/tennis_02.json';
import swimming01Data from './sport/swimming_01.json';
import swimming02Data from './sport/swimming_02.json';
import generalTraining01Data from './sport/general_training_01.json';
import generalTraining02Data from './sport/general_training_02.json';
import generalTraining03Data from './sport/general_training_03.json';
import generalTraining04Data from './sport/general_training_04.json';
import shoppingData from './travel/shopping.json';
import emergencyData from './travel/emergency.json';
import sightseeingData from './travel/sightseeing.json';
import restaurantData from './lifestyle/restaurant.json';
import transportationData from './travel/transportation.json';

const sectionsRegistry: Record<string, Section> = {
  [restaurantData.section_id]: restaurantData as unknown as Section,
  [footballData.section_id]: footballData as unknown as Section,
  [football02Data.section_id]: football02Data as unknown as Section,
  [football03Data.section_id]: football03Data as unknown as Section,
  [basketball01Data.section_id]: basketball01Data as unknown as Section,
  [basketball02Data.section_id]: basketball02Data as unknown as Section,
  [basketball03Data.section_id]: basketball03Data as unknown as Section,
  [tennis01Data.section_id]: tennis01Data as unknown as Section,
  [tennis02Data.section_id]: tennis02Data as unknown as Section,
  [swimming01Data.section_id]: swimming01Data as unknown as Section,
  [swimming02Data.section_id]: swimming02Data as unknown as Section,
  [generalTraining01Data.section_id]: generalTraining01Data as unknown as Section,
  [generalTraining02Data.section_id]: generalTraining02Data as unknown as Section,
  [generalTraining03Data.section_id]: generalTraining03Data as unknown as Section,
  [generalTraining04Data.section_id]: generalTraining04Data as unknown as Section,
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
