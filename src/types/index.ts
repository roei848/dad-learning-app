// Word Bank
export interface WordBankItem {
  word: string;
  translation: string;
  example: string;
}

// Stage 1: Sentence Completion
export interface SentenceQuestion {
  id: number;
  question: string;
  options: string[];
  correct_answer: string;
  hint_hebrew: string;
}

// Stage 2: Story Comprehension
export interface StoryQuestion {
  id: number;
  question: string;
  options: string[];
  correct_answer: string;
}

export interface StoryData {
  text_en: string;
  questions: StoryQuestion[];
}

// Stage 3: Visual & Situational Context
export interface VisualQuestion {
  id: number;
  type: 'dialogue' | 'image' | 'synonym';
  prompt: string;
  options: string[];
  correct_answer: string;
}

// Section (full data for one topic)
export interface Section {
  section_id: string;
  title: string;
  category: string;
  word_bank: WordBankItem[];
  stage_1_sentences: SentenceQuestion[];
  stage_2_story: StoryData;
  stage_3_visual_situational: VisualQuestion[];
}

// Section metadata (for home screen cards)
export interface SectionMeta {
  section_id: string;
  title: string;
  category: string;
  icon: string;
}

// Completion result
export interface SectionResult {
  score: number;
  totalQuestions: number;
  completedAt: string;
}

// Stage type union
export type Stage = 'wordBank' | 'sentenceCompletion' | 'storyComprehension' | 'visualContext' | 'sectionComplete';
