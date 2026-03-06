# React Component Builder — Agent Memory

## Project: English for Dad

### Stack
- React 19 + TypeScript strict mode
- styled-components v6 (already installed)
- Redux Toolkit + react-redux
- Vite build tool
- lucide-react for icons

### Architecture Rules (from react-architect.md)
- Container/Presenter split — MANDATORY for every component
  - Container: `ComponentNameContainer.tsx` — all logic, state, Redux, API calls
  - Presenter: `ComponentName.tsx` — pure UI, styled-components only, no logic
- Styled Components: one wrapper named `{ComponentName}Wrapper`, CSS class names inside it
- Props interfaces: use `Interface` not `type`, named `{Name}ContainerProps` / `{Name}PresenterProps`
- Callback props prefix: `on` (onSave, onClick)
- Boolean props prefix: `is`, `has`, `should`
- Never use `any` type

### Design System (src/theme.ts)
- Warm painterly aesthetic — cream background, sage green primary
- theme object keys: colors, typography, spacing, layout, borderRadius, shadow, shadowHover, transition
- AppTheme type exported from src/theme.ts
- DefaultTheme augmented in src/styled.d.ts
- ThemeProvider wraps entire app in src/main.tsx
- GlobalStyles in src/GlobalStyles.ts — includes prefers-reduced-motion reset

### Key Fixed Design Values
- background: '#FDF5E6' (Old Lace/Cream) — fixed, do not change
- primary: '#6B8F71' (Sage Green)
- secondary: '#5B8CB8' (Soft Blue)
- fontFamily: "'Georgia', 'Times New Roman', serif"
- borderRadius: '12px'
- transition: '0.2s ease-out' (ui-ux-pro-max Claymorphism soft press)

### ui-ux-pro-max Notes
- Always invoke before writing Styled Components
- Skill recommended Claymorphism for this product type
- Key effects: soft inner+outer shadows, smooth 200ms ease-out, rounded 12-24px
- Anti-patterns to avoid: dark modes, complex jargon
- Design brief colors override ui-ux-pro-max palette suggestions

### Important File Paths
- `src/theme.ts` — theme tokens + AppTheme type
- `src/styled.d.ts` — DefaultTheme augmentation
- `src/GlobalStyles.ts` — global CSS reset
- `src/main.tsx` — Provider > ThemeProvider > GlobalStyles > App tree
- `src/app/store.ts` — Redux store
- `src/App.tsx` — root component

### State Management
- Redux Toolkit present — use `useSelector` / `useDispatch` in Containers
- No axios wrapper found yet — use axios directly if needed

### No design-system/MASTER.md exists in this project
