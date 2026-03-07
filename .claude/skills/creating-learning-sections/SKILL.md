---
name: creating-learning-sections
description: Use when adding a new English learning topic/section to the dad-learning-app. Triggers include "add a section", "new topic", "create a lesson", or any request to add vocabulary/content around a new theme.
---

# Creating Learning Sections

## Overview

Each section = one themed topic (e.g. "Dining Out", "Travel"). Adding one requires 5 file changes. Always update the containers (Step 4) or the new section will silently show restaurant content.

## Required Counts (exact)

| Array | Count | Notes |
|-------|-------|-------|
| `word_bank` | 10 items | Each has `word`, `translation` (Hebrew), `example` |
| `stage_1_sentences` | 10 questions | IDs 1–10, has `hint_hebrew` |
| `stage_2_story` | 1 story + 10 questions | Question IDs 11–20, NO `hint_hebrew` |
| `stage_3_visual_situational` | 10 dialogue prompts | IDs 21–30, NO `hint_hebrew` — in JSON but not a live stage yet |

`totalQuestions` is hardcoded to `20` in `sessionSlice.ts` (stages 1 + 2 only).

## Step 1 — Create the data file

`src/data/{topic}.json` — use `restaurant.json` as template:

```json
{
  "section_id": "shopping_01",
  "difficulty": "easy",
  "title": "At the Supermarket",
  "category": "Lifestyle",
  "word_bank": [
    { "word": "Aisle", "translation": "מעבר", "example": "The bread is in aisle four." }
  ],
  "stage_1_sentences": [
    { "id": 1, "question": "I found the bread in _____ four.", "options": ["(a) Aisle", "(b) Cart", "(c) Receipt", "(d) Shelf"], "correct_answer": "a", "hint_hebrew": "מעבר בסופרמרקט" }
  ],
  "stage_2_story": {
    "text_en": "...",
    "questions": [{ "id": 11, "question": "...", "options": ["..."], "correct_answer": "a" }]
  },
  "stage_3_visual_situational": [
    { "id": 21, "type": "dialogue", "prompt": "...", "options": ["..."], "correct_answer": "a" }
  ]
}
```

**Set `difficulty` to match the section's complexity.** Valid values: `easy | medium | hard | extreme`. Use `easy` for everyday vocabulary (greetings, food, shopping), `medium` for broader topics (travel, health), `hard` for abstract or formal language (business, law), and `extreme` for idiomatic or highly nuanced content.

## Step 2 — Create (or update) the sections registry

`src/data/sectionsRegistry.ts` **does not exist yet** — create it on first use, then just add entries for subsequent sections:

```ts
import restaurantData from './restaurant.json';
import shoppingData from './shopping.json';
import type { Section } from '../types';

// as unknown as Section needed because JSON has stage_3_* not in the Section interface
const sectionsRegistry: Record<string, Section> = {
  [restaurantData.section_id]: restaurantData as unknown as Section,
  [shoppingData.section_id]: shoppingData as unknown as Section,
};

export default sectionsRegistry;
```

## Step 3 — Register on the home screen

`src/features/home/HomeContainer.tsx` — import the new JSON and add an entry to `sectionsMeta`:

```tsx
import shoppingData from '../../data/shopping.json';

// inside useEffect, add to sectionsMeta array:
{ section_id: shoppingData.section_id, title: shoppingData.title, category: shoppingData.category, icon: 'ShoppingCart' }
```

Pick an icon name from lucide-react. Must also add it to the icon map (see Step 5).

## Step 4 — Update the 3 stage containers (CRITICAL)

**Without this, clicking your new section shows restaurant content.** All three containers currently hardcode `restaurantData`. Replace with a `DATA_MAP` lookup inside each component.

Pattern (same for all three):

```tsx
// Remove:
import restaurantData from '../../data/restaurant.json';

// Add at top of file:
import restaurantData from '../../data/restaurant.json';
import shoppingData from '../../data/shopping.json';

const DATA_MAP: Record<string, typeof restaurantData> = {
  restaurant_01: restaurantData,
  shopping_01: shoppingData,
};

// Inside the component, add:
const currentSectionId = useAppSelector(state => state.session.currentSectionId);
const sectionData = DATA_MAP[currentSectionId ?? ''] ?? restaurantData;
```

Then replace all `restaurantData.*` accesses with `sectionData.*`.

Files and the field each uses:
- `src/features/wordBank/WordBankContainer.tsx` → `sectionData.word_bank`
- `src/features/sentenceCompletion/SentenceCompletionContainer.tsx` → `sectionData.stage_1_sentences` (move constant INSIDE the component — it currently lives at module scope)
- `src/features/storyComprehension/StoryComprehensionContainer.tsx` → `sectionData.stage_2_story.text_en` and `sectionData.stage_2_story.questions` (also move inside component)

## Step 5 — Register the icon

`src/components/sectionCard/SectionCardContainer.tsx` has an `ICON_MAP`. Add your new icon there or it silently falls back to `UtensilsCrossed`:

```tsx
import { UtensilsCrossed, Plane, Trophy, ShoppingCart } from 'lucide-react';

const ICON_MAP: Record<string, React.ReactNode> = {
  UtensilsCrossed: <UtensilsCrossed size={48} />,
  Plane: <Plane size={48} />,
  Trophy: <Trophy size={48} />,
  ShoppingCart: <ShoppingCart size={48} />,  // add new icon here
};
```

## Summary — files touched

| File | Change |
|------|--------|
| `src/data/{topic}.json` | CREATE — section content |
| `src/data/sectionsRegistry.ts` | CREATE (first time) or UPDATE — add entry |
| `src/features/home/HomeContainer.tsx` | Add import + sectionsMeta entry |
| `src/components/sectionCard/SectionCardContainer.tsx` | Add icon to ICON_MAP |
| `src/features/wordBank/WordBankContainer.tsx` | Replace hardcoded data with DATA_MAP |
| `src/features/sentenceCompletion/SentenceCompletionContainer.tsx` | Same + move const inside component |
| `src/features/storyComprehension/StoryComprehensionContainer.tsx` | Same + move const inside component |

## TypeScript interfaces (reference)

```ts
// src/types/index.ts
interface Section { section_id: string; title: string; category: string; word_bank: WordBankItem[]; stage_1_sentences: SentenceQuestion[]; stage_2_story: StoryData; }
interface WordBankItem  { word: string; translation: string; example: string; }
interface SentenceQuestion { id: number; question: string; options: string[]; correct_answer: string; hint_hebrew: string; }
interface StoryData    { text_en: string; questions: StoryQuestion[]; }
interface StoryQuestion { id: number; question: string; options: string[]; correct_answer: string; }
interface SectionMeta  { section_id: string; title: string; category: string; icon: string; }
```

## Verification

1. `bun dev` (or `npm run dev`)
2. Home screen shows the new section card with correct icon
3. Click it → all 4 stages work: `wordBank → sentenceCompletion → storyComprehension → sectionComplete`
4. Final score out of 20 is correct

## Common mistakes

| Mistake | Fix |
|---------|-----|
| New section shows restaurant content | Step 4 missed — containers still hardcoded |
| Wrong icon shown | Step 5 missed — not added to `ICON_MAP` in `SectionCardContainer.tsx` |
| Section doesn't appear | Step 3 missed — not in `sectionsMeta` in `HomeContainer.tsx` |
| TypeScript error on registry | Use `as unknown as Section` (stage_3 field not in interface) |
| Question IDs wrong | Stage 1: IDs 1–10 with `hint_hebrew`; Stage 2: IDs 11–20, no `hint_hebrew` |
| Data not updating between sections | Constants are at module scope — move inside the component body |
