import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Stage } from '../types';

interface SessionState {
  currentSectionId: string | null;
  currentStage: Stage;
  currentQuestionIndex: number;
  answers: Record<number, string>;
  correctCount: number;
  totalQuestions: number;
}

const initialState: SessionState = {
  currentSectionId: null,
  currentStage: 'wordBank',
  currentQuestionIndex: 0,
  answers: {},
  correctCount: 0,
  totalQuestions: 30,
};

const stageOrder: Stage[] = [
  'wordBank',
  'sentenceCompletion',
  'storyComprehension',
  'visualContext',
  'sectionComplete',
];

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    startSection(state, action: PayloadAction<string>) {
      state.currentSectionId = action.payload;
      state.currentStage = 'wordBank';
      state.currentQuestionIndex = 0;
      state.answers = {};
      state.correctCount = 0;
    },
    advanceStage(state) {
      const currentIndex = stageOrder.indexOf(state.currentStage);
      if (currentIndex < stageOrder.length - 1) {
        state.currentStage = stageOrder[currentIndex + 1];
        state.currentQuestionIndex = 0;
      }
    },
    submitAnswer(state, action: PayloadAction<{ questionId: number; answer: string; isCorrect: boolean }>) {
      const { questionId, answer, isCorrect } = action.payload;
      state.answers[questionId] = answer;
      if (isCorrect) {
        state.correctCount += 1;
      }
    },
    nextQuestion(state) {
      state.currentQuestionIndex += 1;
    },
    resetSession(state) {
      Object.assign(state, initialState);
    },
  },
});

export const { startSection, advanceStage, submitAnswer, nextQuestion, resetSession } = sessionSlice.actions;
export default sessionSlice.reducer;
