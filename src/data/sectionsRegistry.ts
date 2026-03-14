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
import restaurant02Data from './lifestyle/restaurant_02.json';
import supermarket01Data from './lifestyle/supermarket_01.json';
import doctor01Data from './lifestyle/doctor_01.json';
import homeChores01Data from './lifestyle/home_chores_01.json';
import wardrobe01Data from './lifestyle/wardrobe_01.json';
import cafe01Data from './lifestyle/cafe_01.json';
import bank01Data from './lifestyle/bank_01.json';
import pharmacy01Data from './lifestyle/pharmacy_01.json';
import jobInterview01Data from './lifestyle/job_interview_01.json';
import cooking01Data from './lifestyle/cooking_01.json';
import idioms01Data from './lifestyle/idioms_01.json';
import transportationData from './travel/transportation.json';
import familyMembers01Data from './family/family_members_01.json';
import familyDaily01Data from './family/family_daily_01.json';
import familyCelebrations01Data from './family/family_celebrations_01.json';
import familyRelationships01Data from './family/family_relationships_01.json';
import familyConversations01Data from './family/family_conversations_01.json';
import historyEvents01Data from './culture/history_events_01.json';
import musicBasics01Data from './culture/music_basics_01.json';
import movies01Data from './culture/movies_01.json';
import socialCustoms01Data from './culture/social_customs_01.json';
import tvStreaming01Data from './culture/tv_streaming_01.json';
import musicConcerts01Data from './culture/music_concerts_01.json';
import moviesCinema02Data from './culture/movies_cinema_02.json';
import artMuseums01Data from './culture/art_museums_01.json';
import literature01Data from './culture/literature_01.json';
import culturalIdioms01Data from './culture/cultural_idioms_01.json';
import gardenBasics01Data from './garden/garden_basics_01.json';
import flowersPlants01Data from './garden/flowers_plants_01.json';
import vegetableGarden01Data from './garden/vegetable_garden_01.json';
import gardenCare01Data from './garden/garden_care_01.json';
import seasonsHarvest01Data from './garden/seasons_harvest_01.json';
import homeTools01Data from './home_diy/home_tools_01.json';
import homePlumbing01Data from './home_diy/home_plumbing_01.json';
import homeElectrical01Data from './home_diy/home_electrical_01.json';
import homePainting01Data from './home_diy/home_painting_01.json';
import homeCarpentry01Data from './home_diy/home_carpentry_01.json';
import homeCar01Data from './home_diy/home_car_01.json';
import homeCleaning01Data from './home_diy/home_cleaning_01.json';
import homeRenovation01Data from './home_diy/home_renovation_01.json';

const sectionsRegistry: Record<string, Section> = {
  [restaurantData.section_id]: restaurantData as unknown as Section,
  [restaurant02Data.section_id]: restaurant02Data as unknown as Section,
  [supermarket01Data.section_id]: supermarket01Data as unknown as Section,
  [doctor01Data.section_id]: doctor01Data as unknown as Section,
  [homeChores01Data.section_id]: homeChores01Data as unknown as Section,
  [wardrobe01Data.section_id]: wardrobe01Data as unknown as Section,
  [cafe01Data.section_id]: cafe01Data as unknown as Section,
  [bank01Data.section_id]: bank01Data as unknown as Section,
  [pharmacy01Data.section_id]: pharmacy01Data as unknown as Section,
  [jobInterview01Data.section_id]: jobInterview01Data as unknown as Section,
  [cooking01Data.section_id]: cooking01Data as unknown as Section,
  [idioms01Data.section_id]: idioms01Data as unknown as Section,
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
  [familyMembers01Data.section_id]: familyMembers01Data as unknown as Section,
  [familyDaily01Data.section_id]: familyDaily01Data as unknown as Section,
  [familyCelebrations01Data.section_id]: familyCelebrations01Data as unknown as Section,
  [familyRelationships01Data.section_id]: familyRelationships01Data as unknown as Section,
  [familyConversations01Data.section_id]: familyConversations01Data as unknown as Section,
  [historyEvents01Data.section_id]: historyEvents01Data as unknown as Section,
  [musicBasics01Data.section_id]: musicBasics01Data as unknown as Section,
  [movies01Data.section_id]: movies01Data as unknown as Section,
  [socialCustoms01Data.section_id]: socialCustoms01Data as unknown as Section,
  [tvStreaming01Data.section_id]: tvStreaming01Data as unknown as Section,
  [musicConcerts01Data.section_id]: musicConcerts01Data as unknown as Section,
  [moviesCinema02Data.section_id]: moviesCinema02Data as unknown as Section,
  [artMuseums01Data.section_id]: artMuseums01Data as unknown as Section,
  [literature01Data.section_id]: literature01Data as unknown as Section,
  [culturalIdioms01Data.section_id]: culturalIdioms01Data as unknown as Section,
  [gardenBasics01Data.section_id]: gardenBasics01Data as unknown as Section,
  [flowersPlants01Data.section_id]: flowersPlants01Data as unknown as Section,
  [vegetableGarden01Data.section_id]: vegetableGarden01Data as unknown as Section,
  [gardenCare01Data.section_id]: gardenCare01Data as unknown as Section,
  [seasonsHarvest01Data.section_id]: seasonsHarvest01Data as unknown as Section,
  [homeTools01Data.section_id]: homeTools01Data as unknown as Section,
  [homePlumbing01Data.section_id]: homePlumbing01Data as unknown as Section,
  [homeElectrical01Data.section_id]: homeElectrical01Data as unknown as Section,
  [homePainting01Data.section_id]: homePainting01Data as unknown as Section,
  [homeCarpentry01Data.section_id]: homeCarpentry01Data as unknown as Section,
  [homeCar01Data.section_id]: homeCar01Data as unknown as Section,
  [homeCleaning01Data.section_id]: homeCleaning01Data as unknown as Section,
  [homeRenovation01Data.section_id]: homeRenovation01Data as unknown as Section,
};

export default sectionsRegistry;
