import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { SectionMeta, SectionResult } from '../types';

interface SectionsState {
  sections: SectionMeta[];
  completedSections: Record<string, SectionResult>;
}

const initialState: SectionsState = {
  sections: [],
  completedSections: {},
};

const sectionsSlice = createSlice({
  name: 'sections',
  initialState,
  reducers: {
    loadSections(state, action: PayloadAction<SectionMeta[]>) {
      state.sections = action.payload;
    },
    markCompleted(state, action: PayloadAction<{ sectionId: string; score: number; totalQuestions: number }>) {
      state.completedSections[action.payload.sectionId] = {
        score: action.payload.score,
        totalQuestions: action.payload.totalQuestions,
        completedAt: new Date().toISOString(),
      };
    },
  },
});

export const { loadSections, markCompleted } = sectionsSlice.actions;
export default sectionsSlice.reducer;
