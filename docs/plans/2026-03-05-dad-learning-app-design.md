# Design: English for Dad — Learning Web App

## Overview

A desktop-first English learning web app for an intermediate Hebrew-speaking learner. Focused on vocabulary acquisition through thematic sections with a 4-stage learning flow.

## Tech Stack

- **Vite + React 18 + TypeScript** (strict mode)
- **Redux Toolkit** — state management (sessionSlice + sectionsSlice)
- **Styled Components** — all styling, design tokens from ui-ux-pro-max
- **Lucide React** — iconography
- **Web Speech API** — audio playback for word pronunciation

## Architecture

### Pattern: Container/Presenter

Every component split into:
- **Container** (`XContainer.tsx`) — business logic, Redux access, API calls
- **Presenter** (`X.tsx`) — pure visual, receives everything via props

### Folder Structure

```
src/
├── app/
│   └── store.ts
├── data/
│   └── restaurant.json
├── components/
│   ├── questionCard/
│   │   ├── QuestionCardContainer.tsx
│   │   └── QuestionCard.tsx
│   ├── optionButton/
│   │   ├── OptionButtonContainer.tsx
│   │   └── OptionButton.tsx
│   ├── progressBar/
│   │   ├── ProgressBarContainer.tsx
│   │   └── ProgressBar.tsx
│   ├── wordCard/
│   │   ├── WordCardContainer.tsx
│   │   └── WordCard.tsx
│   ├── sectionCard/
│   │   ├── SectionCardContainer.tsx
│   │   └── SectionCard.tsx
│   ├── hebrewHint/
│   │   └── HebrewHint.tsx
│   └── stageHeader/
│       └── StageHeader.tsx
├── features/
│   ├── home/
│   │   ├── HomeContainer.tsx
│   │   └── Home.tsx
│   ├── wordBank/
│   │   ├── WordBankContainer.tsx
│   │   └── WordBank.tsx
│   ├── sentenceCompletion/
│   │   ├── SentenceCompletionContainer.tsx
│   │   └── SentenceCompletion.tsx
│   ├── storyComprehension/
│   │   ├── StoryComprehensionContainer.tsx
│   │   └── StoryComprehension.tsx
│   ├── visualContext/
│   │   ├── VisualContextContainer.tsx
│   │   └── VisualContext.tsx
│   └── sectionComplete/
│       ├── SectionCompleteContainer.tsx
│       └── SectionComplete.tsx
├── store/
│   ├── sessionSlice.ts
│   └── sectionsSlice.ts
├── types/
│   └── index.ts
└── App.tsx
```

## State Management (Redux Toolkit)

### sessionSlice — Active Learning Session

```typescript
interface SessionState {
  currentSectionId: string | null;
  currentStage: 'wordBank' | 'sentenceCompletion' | 'storyComprehension' | 'visualContext' | 'sectionComplete';
  currentQuestionIndex: number;
  answers: Record<number, string>;
  correctCount: number;
  totalQuestions: number;
}
```

Actions: `startSection`, `advanceStage`, `submitAnswer`, `nextQuestion`, `resetSession`

### sectionsSlice — Section Catalog

```typescript
interface SectionsState {
  sections: SectionMeta[];
  completedSections: Record<string, SectionResult>;
}
```

Actions: `loadSections`, `markCompleted`

### Screen Routing (No Router Library)

App.tsx reads `currentSectionId` and `currentStage` from the store:
- `null` section -> Home
- Stage value -> corresponding feature component

## UX & Visual Design

### Layout (Desktop-First)
- Max-width: 1200px centered
- Home grid: 2-3 columns of SectionCards
- Question stages: content area ~800px centered
- Story text: ~900px for comfortable reading
- WordBank: grid of WordCards, 2-3 columns

### Color Palette
- Background: `#FDF5E6` (Old Lace/Cream)
- Primary: `#6B8F71` (Sage Green)
- Secondary: `#5B8CB8` (Soft Blue)
- Correct: `#4CAF50` (Green)
- Wrong: `#E57373` (Soft Red)
- Text: `#2C2C2C` (near-black)
- Card Background: `#FFFFFF` with subtle box-shadow

Note: Final palette will be refined via ui-ux-pro-max during implementation.

### Typography
- Body: 20px minimum
- Story text: 24px, 1.6 line-height
- Headings: 28-32px bold
- Hebrew translations: 18px

### Interactions
- OptionButton: default -> selected -> correct (green + checkmark) / wrong (red + X)
- WordCard: hover lift, audio button pulse
- SectionCard: large tap target, hover scale
- Stage transitions: simple fade
- Success: confetti + "Well Done, Dad!" + score summary + word review

### Icons (Lucide React)
- Restaurant: UtensilsCrossed
- Travel: Plane
- Football: Trophy
- Audio: Volume2
- Hint: HelpCircle
- Progress: CheckCircle

## Shared Components

| Component | Purpose | Container? |
|-----------|---------|-----------|
| QuestionCard | Full question: prompt + options + feedback | Yes |
| OptionButton | Single A/B/C/D with 4 visual states | Yes |
| ProgressBar | "Question 12/30" + visual bar | Yes |
| WordCard | Word + Hebrew + audio + example sentence | Yes |
| SectionCard | Home tile: icon + title + category + status | Yes |
| HebrewHint | Toggleable hint bubble | No (presenter-only) |
| StageHeader | Stage title + icon + description | No (presenter-only) |

## Data

Static JSON in `src/data/`. Starting with restaurant section only. Structure follows the spec's JSON schema (word_bank, stage_1_sentences, stage_2_story, stage_3_visual_situational).

## Audio

Web Speech API (`speechSynthesis`) for pronouncing English words. No backend or external API needed.
