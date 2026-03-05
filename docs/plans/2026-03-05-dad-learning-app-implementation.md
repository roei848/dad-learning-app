# English for Dad — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a desktop-first English learning web app with a 4-stage learning flow (Word Bank -> Sentence Completion -> Story Comprehension -> Visual Context -> Section Complete).

**Architecture:** Container/Presenter pattern with Redux Toolkit for state. Shared components (QuestionCard, OptionButton, etc.) are composed by feature screens. No router — App.tsx reads Redux state to determine which screen to render. All React components must be built using the `react-component-builder` agent.

**Tech Stack:** Vite, React 18, TypeScript (strict), Redux Toolkit, Styled Components, Lucide React, Web Speech API

**Design Doc:** `docs/plans/2026-03-05-dad-learning-app-design.md`

**Component Building Rule:** Every React component task MUST be dispatched to the `react-component-builder` agent. That agent will read `rules/react-architect.md`, invoke `ui-ux-pro-max` for design tokens, and build Container/Presenter pairs with Styled Components.

---

## Task 1: Project Scaffolding

**Files:**
- Create: `package.json`, `tsconfig.json`, `vite.config.ts`, `index.html`, `src/main.tsx`, `src/vite-env.d.ts`

**Step 1: Scaffold Vite + React + TypeScript project**

```bash
cd /Users/roeicohen/my-projects/claude/dad-learning-app
npm create vite@latest . -- --template react-ts
```

If the directory is not empty, it will prompt — select "Ignore files and continue".

**Step 2: Install dependencies**

```bash
npm install @reduxjs/toolkit react-redux styled-components lucide-react
npm install -D @types/styled-components
```

**Step 3: Verify the app runs**

```bash
npm run dev
```

Expected: Vite dev server starts, app loads at localhost:5173.

**Step 4: Clean up Vite boilerplate**

Remove default Vite content:
- Delete `src/App.css`, `src/index.css`, `src/assets/react.svg`
- Clear `src/App.tsx` to a minimal component:

```tsx
const App = () => {
  return <div>English for Dad</div>;
};

export default App;
```

- Remove CSS imports from `src/main.tsx`

**Step 5: Commit**

```bash
git init
git add .
git commit -m "chore: scaffold Vite + React + TypeScript project with dependencies"
```

---

## Task 2: TypeScript Types & Interfaces

**Files:**
- Create: `src/types/index.ts`

**Step 1: Define all shared types**

```typescript
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
```

**Step 2: Commit**

```bash
git add src/types/index.ts
git commit -m "feat: add TypeScript interfaces for section data and state"
```

---

## Task 3: Static Data — Restaurant Section

**Files:**
- Create: `src/data/restaurant.json`

**Step 1: Create the restaurant section JSON**

Follow the schema from `app_spec.md`. Include:
- `section_id`: `"restaurant_01"`
- `title`: `"Dining Out"`
- `category`: `"Lifestyle"`
- `word_bank`: 10 words (Reservation, Beverage, Appetizer, Entrée, Dessert, Waiter, Menu, Bill, Tip, Portion)
- `stage_1_sentences`: 10 questions using fill-in-the-blank format
- `stage_2_story`: A 150-200 word story about dining out + 10 comprehension questions
- `stage_3_visual_situational`: 10 dialogue/situational questions

Each question must have: `id`, `question`/`prompt`, `options` (4 choices as `"(a) ...", "(b) ...", "(c) ...", "(d) ..."`), `correct_answer` (lowercase letter).

Word bank IDs: none (just word/translation/example).
Stage 1 IDs: 1-10. Stage 2 IDs: 11-20. Stage 3 IDs: 21-30.

**Step 2: Verify JSON is valid**

```bash
node -e "JSON.parse(require('fs').readFileSync('src/data/restaurant.json', 'utf8')); console.log('Valid JSON')"
```

Expected: `Valid JSON`

**Step 3: Commit**

```bash
git add src/data/restaurant.json
git commit -m "feat: add restaurant section data with 10 words and 30 questions"
```

---

## Task 4: Redux Store Setup

**Files:**
- Create: `src/app/store.ts`
- Modify: `src/main.tsx` (wrap App in Redux Provider)

**Step 1: Create the Redux store**

```typescript
// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from '../store/sessionSlice';
import sectionsReducer from '../store/sectionsSlice';

export const store = configureStore({
  reducer: {
    session: sessionReducer,
    sections: sectionsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

**Step 2: Create typed hooks**

Create `src/app/hooks.ts`:

```typescript
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
```

**Step 3: Wrap App in Provider in main.tsx**

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
```

Note: This task depends on Task 5 (slices) to compile. Create placeholder slice files first if needed, or implement Task 4 and Task 5 together.

**Step 4: Commit**

```bash
git add src/app/store.ts src/app/hooks.ts src/main.tsx
git commit -m "feat: configure Redux store with typed hooks and Provider"
```

---

## Task 5: Redux Slices

**Files:**
- Create: `src/store/sessionSlice.ts`
- Create: `src/store/sectionsSlice.ts`

**Step 1: Create sessionSlice**

```typescript
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
```

**Step 2: Create sectionsSlice**

```typescript
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
```

**Step 3: Verify app compiles**

```bash
npm run dev
```

Expected: No TypeScript errors, app loads.

**Step 4: Commit**

```bash
git add src/store/sessionSlice.ts src/store/sectionsSlice.ts
git commit -m "feat: add sessionSlice and sectionsSlice with all actions"
```

---

## Task 6: Theme & Design System

**Files:**
- Create: `src/theme.ts`

**Pre-requisite:** Invoke `ui-ux-pro-max` skill to generate design system recommendations for a "warm educational learning app" with React + Styled Components stack. Extract color palette, typography, spacing, effects.

**Step 1: Create theme file**

Map ui-ux-pro-max output to a Styled Components theme object. The theme must include at minimum:

```typescript
export const theme = {
  colors: {
    background: '#FDF5E6',
    cardBackground: '#FFFFFF',
    primary: '#6B8F71',       // Sage Green — refine from ui-ux-pro-max
    secondary: '#5B8CB8',     // Soft Blue — refine from ui-ux-pro-max
    correct: '#4CAF50',
    wrong: '#E57373',
    text: '#2C2C2C',
    textLight: '#666666',
    border: '#E0D5C1',
  },
  typography: {
    fontFamily: "'Georgia', 'Times New Roman', serif",  // Warm, readable
    body: '20px',
    story: '24px',
    heading: '32px',
    subheading: '24px',
    hebrew: '18px',
    lineHeight: '1.6',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  layout: {
    maxWidth: '1200px',
    contentWidth: '800px',
    storyWidth: '900px',
  },
  borderRadius: '12px',
  shadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
  shadowHover: '0 4px 16px rgba(0, 0, 0, 0.12)',
  transition: '0.2s ease',
};

export type AppTheme = typeof theme;
```

**Step 2: Create styled.d.ts for theme typing**

Create `src/styled.d.ts`:

```typescript
import 'styled-components';
import type { AppTheme } from './theme';

declare module 'styled-components' {
  export interface DefaultTheme extends AppTheme {}
}
```

**Step 3: Wrap App in ThemeProvider in main.tsx**

Add `ThemeProvider` from styled-components wrapping `<App />`, passing the theme.

**Step 4: Add global styles**

Create `src/GlobalStyles.ts`:

```typescript
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: ${({ theme }) => theme.typography.fontFamily};
    font-size: ${({ theme }) => theme.typography.body};
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.background};
    line-height: ${({ theme }) => theme.typography.lineHeight};
  }
`;

export default GlobalStyles;
```

Add `<GlobalStyles />` inside ThemeProvider in main.tsx.

**Step 5: Verify styling applies**

```bash
npm run dev
```

Expected: Cream background, serif font visible.

**Step 6: Commit**

```bash
git add src/theme.ts src/styled.d.ts src/GlobalStyles.ts src/main.tsx
git commit -m "feat: add theme, global styles, and ThemeProvider"
```

---

## Task 7: Shared Component — StageHeader

**Agent:** `react-component-builder`

**Files:**
- Create: `src/components/stageHeader/StageHeader.tsx`

**Description:** Presenter-only component (no container needed). Displays the stage title, an icon from Lucide React, and a short description. Used at the top of each stage screen.

**Props Interface:**

```typescript
interface StageHeaderPresenterProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}
```

**Styled wrapper:** `StageHeaderWrapper` at bottom of file. Large heading (theme.typography.heading), icon left of title, description below in lighter text.

**Commit after building.**

---

## Task 8: Shared Component — HebrewHint

**Agent:** `react-component-builder`

**Files:**
- Create: `src/components/hebrewHint/HebrewHint.tsx`

**Description:** Presenter-only. A toggleable hint bubble. Shows a HelpCircle icon; clicking reveals the Hebrew hint text. Used in Sentence Completion stage.

**Props Interface:**

```typescript
interface HebrewHintPresenterProps {
  hint: string;
  isVisible: boolean;
  onToggle: () => void;
}
```

**Styled wrapper:** `HebrewHintWrapper`. Subtle background, right-to-left text for Hebrew, smooth show/hide transition.

**Commit after building.**

---

## Task 9: Shared Component — OptionButton

**Agent:** `react-component-builder`

**Files:**
- Create: `src/components/optionButton/OptionButtonContainer.tsx`
- Create: `src/components/optionButton/OptionButton.tsx`

**Description:** A single A/B/C/D answer option with 4 visual states: default, selected, correct, wrong. Container handles click logic and determines the visual state. Presenter renders styled button.

**Props Interfaces:**

```typescript
// Container props
interface OptionButtonContainerProps {
  label: string;               // e.g. "(a) Menu"
  isCorrect: boolean;          // is this the right answer?
  isDisabled: boolean;         // after answering, disable all
  selectedAnswer: string | null; // which option was selected
  onSelect: (label: string) => void;
}

// Presenter props
interface OptionButtonPresenterProps {
  label: string;
  state: 'default' | 'selected' | 'correct' | 'wrong';
  isDisabled: boolean;
  onClick: () => void;
}
```

**Visual states:**
- default: white bg, border
- selected: blue border highlight
- correct: green bg + CheckCircle icon
- wrong: red bg + XCircle icon

**Commit after building.**

---

## Task 10: Shared Component — QuestionCard

**Agent:** `react-component-builder`

**Files:**
- Create: `src/components/questionCard/QuestionCardContainer.tsx`
- Create: `src/components/questionCard/QuestionCard.tsx`

**Description:** Composes the full question layout. Container manages answer state (selected answer, whether answered), dispatches `submitAnswer` to Redux, provides "Next" button callback. Presenter renders question text + 4 OptionButtons + optional HebrewHint + Next button.

**Props Interfaces:**

```typescript
// Container props
interface QuestionCardContainerProps {
  questionId: number;
  questionText: string;
  options: string[];
  correctAnswer: string;       // "a", "b", "c", or "d"
  hintHebrew?: string;
  onNext: () => void;          // called when user clicks Next after answering
}

// Presenter props
interface QuestionCardPresenterProps {
  questionText: string;
  options: string[];
  correctAnswer: string;
  selectedAnswer: string | null;
  isAnswered: boolean;
  hintHebrew?: string;
  isHintVisible: boolean;
  onSelectOption: (option: string) => void;
  onToggleHint: () => void;
  onNext: () => void;
}
```

**Commit after building.**

---

## Task 11: Shared Component — ProgressBar

**Agent:** `react-component-builder`

**Files:**
- Create: `src/components/progressBar/ProgressBarContainer.tsx`
- Create: `src/components/progressBar/ProgressBar.tsx`

**Description:** Container reads `currentQuestionIndex`, `currentStage`, and `totalQuestions` from Redux sessionSlice. Computes question number across stages (stage1: 1-10, stage2: 11-20, stage3: 21-30). Presenter shows "Question X/30" text + a visual progress bar.

**Styled wrapper:** `ProgressBarWrapper`. Bar uses theme.colors.primary for filled portion. Fixed at top of question screens.

**Commit after building.**

---

## Task 12: Shared Component — WordCard

**Agent:** `react-component-builder`

**Files:**
- Create: `src/components/wordCard/WordCardContainer.tsx`
- Create: `src/components/wordCard/WordCard.tsx`

**Description:** Container handles Web Speech API audio playback (`window.speechSynthesis`). Presenter displays English word (large), Hebrew translation, example sentence, and a Volume2 icon button for audio.

**Props Interfaces:**

```typescript
// Container props
interface WordCardContainerProps {
  word: string;
  translation: string;
  example: string;
}

// Presenter props
interface WordCardPresenterProps {
  word: string;
  translation: string;
  example: string;
  onPlayAudio: () => void;
  isPlaying: boolean;
}
```

**Audio implementation in container:**

```typescript
const handlePlayAudio = () => {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = 'en-US';
  utterance.rate = 0.85; // Slightly slower for learners
  window.speechSynthesis.speak(utterance);
};
```

**Styled wrapper:** `WordCardWrapper`. White card with shadow, hover lift, word is large bold, translation is right-to-left, example in italic. Audio button pulses on hover.

**Commit after building.**

---

## Task 13: Shared Component — SectionCard

**Agent:** `react-component-builder`

**Files:**
- Create: `src/components/sectionCard/SectionCardContainer.tsx`
- Create: `src/components/sectionCard/SectionCard.tsx`

**Description:** Container reads completion status from Redux sectionsSlice. Presenter renders a large clickable card with Lucide icon, section title, category, and completion badge if done.

**Props Interfaces:**

```typescript
// Container props
interface SectionCardContainerProps {
  sectionId: string;
  title: string;
  category: string;
  icon: string;                // Lucide icon name
  onStart: (sectionId: string) => void;
}

// Presenter props
interface SectionCardPresenterProps {
  title: string;
  category: string;
  icon: React.ReactNode;
  isCompleted: boolean;
  score?: number;
  totalQuestions?: number;
  onClick: () => void;
}
```

**Styled wrapper:** `SectionCardWrapper`. Large card (min 200px height), hover scale effect, completion state shows green CheckCircle badge + score.

**Commit after building.**

---

## Task 14: Feature — Home Screen

**Agent:** `react-component-builder`

**Files:**
- Create: `src/features/home/HomeContainer.tsx`
- Create: `src/features/home/Home.tsx`

**Description:** Container loads sections metadata from static JSON, dispatches `loadSections` on mount, reads sections from Redux, handles `startSection` dispatch. Presenter renders a welcoming header ("Hello Dad! Ready to learn?") + grid of SectionCards.

**Layout:** Centered max-width 1200px, SectionCards in a responsive grid (3 columns desktop, 2 columns smaller).

**Commit after building.**

---

## Task 15: Feature — Word Bank Screen

**Agent:** `react-component-builder`

**Files:**
- Create: `src/features/wordBank/WordBankContainer.tsx`
- Create: `src/features/wordBank/WordBank.tsx`

**Description:** Container loads word_bank data for the current section from static JSON. Presenter renders StageHeader ("Word Bank" + BookOpen icon) + grid of WordCards + a "Start Learning" button that dispatches `advanceStage`.

**Layout:** WordCards in 2-3 column grid, "Start Learning" button large and centered at bottom.

**Commit after building.**

---

## Task 16: Feature — Sentence Completion Screen

**Agent:** `react-component-builder`

**Files:**
- Create: `src/features/sentenceCompletion/SentenceCompletionContainer.tsx`
- Create: `src/features/sentenceCompletion/SentenceCompletion.tsx`

**Description:** Container reads stage_1_sentences from section data, manages current question index via Redux, handles advancing to next question or stage. Presenter renders ProgressBar + StageHeader + QuestionCard with Hebrew hint support.

When all 10 questions are answered, container dispatches `advanceStage`.

**Commit after building.**

---

## Task 17: Feature — Story Comprehension Screen

**Agent:** `react-component-builder`

**Files:**
- Create: `src/features/storyComprehension/StoryComprehensionContainer.tsx`
- Create: `src/features/storyComprehension/StoryComprehension.tsx`

**Description:** Container reads stage_2_story from section data. Presenter renders ProgressBar + StageHeader + the story text block (24px, 1.6 line-height, ~900px width) + QuestionCard below the story. Story stays visible while answering questions.

When all 10 questions are answered, container dispatches `advanceStage`.

**Commit after building.**

---

## Task 18: Feature — Visual Context Screen

**Agent:** `react-component-builder`

**Files:**
- Create: `src/features/visualContext/VisualContextContainer.tsx`
- Create: `src/features/visualContext/VisualContext.tsx`

**Description:** Container reads stage_3_visual_situational from section data. Presenter renders ProgressBar + StageHeader + QuestionCard. The `prompt` field is displayed prominently above the options (it may be a dialogue or situational description).

When all 10 questions are answered, container dispatches `advanceStage` and also dispatches `markCompleted` with the score.

**Commit after building.**

---

## Task 19: Feature — Section Complete Screen

**Agent:** `react-component-builder`

**Files:**
- Create: `src/features/sectionComplete/SectionCompleteContainer.tsx`
- Create: `src/features/sectionComplete/SectionComplete.tsx`

**Description:** Container reads correctCount, totalQuestions, and word_bank from state/data. Presenter renders:
- "Well Done, Dad!" heading with a success animation (CSS confetti or celebration effect)
- Score summary: "You got X out of 30 correct!"
- Word review: list of all learned words with translations
- "Back to Home" button that dispatches `resetSession`

**Commit after building.**

---

## Task 20: App.tsx — Screen Router

**Files:**
- Modify: `src/App.tsx`

**Step 1: Implement stage-based routing**

```tsx
import { useAppSelector } from './app/hooks';
import HomeContainer from './features/home/HomeContainer';
import WordBankContainer from './features/wordBank/WordBankContainer';
import SentenceCompletionContainer from './features/sentenceCompletion/SentenceCompletionContainer';
import StoryComprehensionContainer from './features/storyComprehension/StoryComprehensionContainer';
import VisualContextContainer from './features/visualContext/VisualContextContainer';
import SectionCompleteContainer from './features/sectionComplete/SectionCompleteContainer';

const App = () => {
  const { currentSectionId, currentStage } = useAppSelector((state) => state.session);

  if (!currentSectionId) {
    return <HomeContainer />;
  }

  switch (currentStage) {
    case 'wordBank':
      return <WordBankContainer />;
    case 'sentenceCompletion':
      return <SentenceCompletionContainer />;
    case 'storyComprehension':
      return <StoryComprehensionContainer />;
    case 'visualContext':
      return <VisualContextContainer />;
    case 'sectionComplete':
      return <SectionCompleteContainer />;
    default:
      return <HomeContainer />;
  }
};

export default App;
```

**Step 2: Verify full flow**

```bash
npm run dev
```

Expected: Home screen loads, clicking a section enters Word Bank, can progress through all stages to Section Complete, then back to Home.

**Step 3: Commit**

```bash
git add src/App.tsx
git commit -m "feat: implement stage-based screen routing in App.tsx"
```

---

## Task 21: Integration Testing & Polish

**Step 1: Full flow walkthrough**

Manually test the complete flow:
1. Home screen shows restaurant section card
2. Click card -> Word Bank with 10 words, audio works
3. Click "Start Learning" -> Sentence Completion, 10 questions
4. Complete all 10 -> Story Comprehension with visible story + 10 questions
5. Complete all 10 -> Visual Context with 10 questions
6. Complete all 10 -> Section Complete with score + word review
7. Click "Back to Home" -> Home shows completion badge + score

**Step 2: Fix any issues found**

**Step 3: Final commit**

```bash
git add -A
git commit -m "feat: complete English for Dad v1 — full learning flow"
```
