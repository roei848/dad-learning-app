# Web App Specification: English for Dad

## 1. Overview
A language learning web application tailored for an intermediate English learner (Hebrew speaker). The focus is on vocabulary acquisition and context comprehension through thematic sections, avoiding heavy grammar drills.

## 2. Section Structure (The "Flow")
Each section (e.g., "At the Restaurant", "Football", "Travel") consists of 3 distinct stages, totaling 30 questions.

### Stage 0: Preparation (Word Bank)
**Goal:** Introduction to 10-15 target words.

**UI:** A list of cards. Each card has the English word, Hebrew translation, and a "Play Audio" button.

### Stage 1: Sentence Completion (10 Questions)
**Goal:** Basic usage of the new words.

**Format:** Single sentence with a blank.

**Options:** 4 multiple-choice (A, B, C, D).

### Stage 2: Story Comprehension (10 Questions)
**Goal:** Reading a short narrative (150-200 words) using the target words.

**Format:** A text block followed by 10 questions.

**Options:** 4 multiple-choice (A, B, C, D) regarding facts or context from the story.

### Stage 3: Visual & Situational Context (10 Questions)
**Goal:** Higher-level association (Images, Synonyms, or Dialogues).

**Format:** A prompt (e.g., "Look at the image" or "Complete the dialogue").

**Options:** 4 multiple-choice (A, B, C, D).

## 3. Data Schema (JSON Example)

```json
{
  "section_id": "restaurant_01",
  "title": "Dining Out",
  "category": "Lifestyle",
  "word_bank": [
    {
      "word": "Reservation",
      "translation": "הזמנה (מראש)",
      "example": "I made a reservation for two people."
    },
    {
      "word": "Beverage",
      "translation": "משקה",
      "example": "Would you like a cold beverage?"
    }
  ],
  "stage_1_sentences": [
    {
      "id": 1,
      "question": "We need to call the restaurant to make a ___.",
      "options": ["(a) Menu", "(b) Table", "(c) Reservation", "(d) Bill"],
      "correct_answer": "c",
      "hint_hebrew": "הזמנה מראש"
    }
  ],
  "stage_2_story": {
    "text_en": "Last night, David went to a famous Italian restaurant. He had a reservation for 8:00 PM. The waiter brought the menu and suggested a refreshing beverage. David was so hungry that he ordered two main courses.",
    "questions": [
      {
        "id": 11,
        "question": "What did the waiter suggest to David?",
        "options": ["(a) A dessert", "(b) A beverage", "(c) To leave", "(d) A chair"],
        "correct_answer": "b"
      }
    ]
  },
  "stage_3_visual_situational": [
    {
      "id": 21,
      "type": "dialogue",
      "prompt": "Customer: 'Can we have the bill, please?' - What is the customer ready to do?",
      "options": ["(a) Order more food", "(b) Pay and leave", "(c) Sit down", "(d) Cook"],
      "correct_answer": "b"
    }
  ]
}
```

## 4. Technical Guidelines for UI (Dad-Friendly)

- **Contrast:** Black text on a `#FDF5E6` (Old Lace/Cream) background to reduce eye strain.
- **Typography:** Minimum 18px for body text, 22px for the story.
- **Progress:** A clear progress bar at the top of the screen (e.g., "Question 12/30").
- **Success State:** A "Well Done, Dad!" message with a summary of new words learned at the end of each section.
