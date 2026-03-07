# Project Rules

## Architecture & Component Standards

All React component architecture rules are defined in:

@rules/react-architect.md

---

## Project Overview

**"English for Dad"** — A Hebrew-speaking father's English learning app.
Warm, painterly aesthetic (Old Lace cream background, Sage Green, Soft Blue).

## Tech Stack

- **React 18** + **TypeScript** (strict)
- **Styled Components** for all styling
- **Redux** (standard, not Toolkit) for global state
- **No external routing library** — stage-based screen routing via `App.tsx`

## Key Files

| File | Purpose |
|------|---------|
| `src/theme.ts` | Design tokens — always use these, never hardcode colors/fonts |
| `src/App.tsx` | Stage-based screen router — add new screens here |
| `src/store/` | Redux store, actions, reducers |

## Design System

All values live in `src/theme.ts`. Current typography scale:

```
body: 22px | story: 26px | heading: 36px | subheading: 26px | hebrew: 20px
```

Font: Georgia serif. Colors: Cream bg `#FDF5E6`, Sage `#6B8F71`, Blue `#5B8CB8`.
Claymorphism style — soft shadows, 12px border radius, 200ms ease-out transitions.

## Screen Routing Pattern

Screens are rendered based on a `stage` value in global state.
To add a screen: add a `case` in `App.tsx` and a corresponding action/reducer.

## State Management

Uses `useReducer` + `dispatch` pattern. Dispatch `markCompleted` to advance stages.
Containers use `useSelector` / `useDispatch` — no Redux access in Presenters.

## Repository & Deployment

- **GitHub:** https://github.com/roei848/dad-learning-app
- **Hosting:** Vercel — auto-deploys on every push to `master`
- **Build command:** `npm run build` (`tsc -b && vite build`)
- **Output dir:** `dist/`
- **Config:** `vercel.json` at project root

## Conventions

- Container files: `ComponentContainer.tsx`
- Presenter files: `Component.tsx`
- One `{ComponentName}Wrapper` styled component per Presenter
- Boolean props: `isLoading`, `hasError` — callback props: `onSubmit`, `onClick`
