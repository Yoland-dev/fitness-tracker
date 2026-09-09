# Planning Document — FitTrack

## Component Hierarchy

```
App
├── Navbar
├── Home
│   └── AudioPlayer (x2)
├── ExercisesPage
│   ├── ExerciseFilter
│   │   └── SearchBar
│   └── ExerciseList
│       └── ExerciseCard (xN)
│           ├── Card
│           ├── Badge (x2)
│           └── Button
├── ExerciseDetail
│   ├── Badge (x2)
│   └── VideoPlayer
├── WorkoutPlannerPage
│   └── WorkoutPlanner
│       └── DayCard (x7)
│           ├── Card
│           └── Button
├── HistoryPage
│   └── WorkoutLog
│       └── LogEntry (xN)
├── ProgressPage
│   └── ProgressChart
├── NotFound
└── Footer
```
This gives 4+ levels of nesting (App → Page → Feature component → UI
primitive, e.g. App → ExercisesPage → ExerciseList → ExerciseCard → Card).

## Data Flow Diagram

```
App state: exercises, isLoading, workoutPlan, workoutHistory
   │  (props down)
   ├──► ExercisesPage (exercises, isLoading, planExerciseIds)
   │        │ (props down)            (callbacks up)
   │        └──► ExerciseList ──► ExerciseCard ──onAdd──► handleAddToWorkout ──► setWorkoutPlan (App)
   │
   ├──► ExerciseDetail (exercises) — reads :id from useParams
   │
   ├──► WorkoutPlannerPage (workoutPlan) ──► WorkoutPlanner ──► DayCard
   │        DayCard --onRemoveExercise/onClearDay--► App state updates
   │
   ├──► HistoryPage (exercises, workoutHistory) ──► WorkoutLog
   │        WorkoutLog --onLogWorkout--► App state updates ──► localStorage
   │
   └──► ProgressPage (workoutHistory, workoutPlan) — derives stats, no further state
```
`workoutPlan` and `workoutHistory` are persisted via the `useLocalStorage`
hook, so they survive page reloads. Sibling pages (ExercisesPage and
WorkoutPlannerPage) stay in sync because they both read/write the same
lifted state in `App`.

## Components To Be Created

| Component | Purpose |
|---|---|
| Navbar | Route links, active styling, mobile menu |
| Home | Landing page, motivational audio |
| ExercisesPage | Search/filter + exercise grid |
| ExerciseFilter | Category/difficulty/muscle-group controls |
| ExerciseList | Renders ExerciseCards, handles loading/empty/error |
| ExerciseCard | Summary card, add-to-plan button |
| ExerciseDetail | Full exercise info + video, dynamic route |
| WorkoutPlannerPage / WorkoutPlanner | Weekly planner container |
| DayCard | One day of the plan (reused 7x) |
| HistoryPage / WorkoutLog | Log form + history list |
| LogEntry | One logged workout row |
| ProgressPage / ProgressChart | Stats + simple bar chart |
| VideoPlayer / AudioPlayer | HTML5 media with custom controls |
| Button, Card, Badge, SearchBar, Modal | Reusable UI primitives |
| Header, Footer, Loading, EmptyState | Shared layout/status components |
| NotFound | 404 page |

## Props Flow (Key Examples)

- `App` → `ExercisesPage`: `exercises`, `isLoading`, `onSelectExercise`,
  `onAddToWorkout`, `planExerciseIds`
- `ExerciseList` → `ExerciseCard`: `exercise`, `onSelect`, `onAdd`, `isInPlan`
- `App` → `WorkoutPlannerPage` → `WorkoutPlanner` → `DayCard`: `workoutPlan`
  slice per day, `onRemoveExercise`, `onClearDay`
- `App` → `HistoryPage` → `WorkoutLog`: `exercises`, `workoutHistory`,
  `onLogWorkout`

## State Management Strategy

- **Lifted/shared state** lives in `App.jsx`: `exercises`, `isLoading`,
  `workoutPlan`, `workoutHistory` — needed by 2+ pages each.
- **Persisted state** (`workoutPlan`, `workoutHistory`) goes through the
  custom `useLocalStorage` hook so refreshing the browser doesn't lose data.
- **Local/page state** (search term, filters, log-entry form fields, modal
  open/closed) stays inside the component that owns it.
- Callback props (`onAddToWorkout`, `onRemoveExercise`, `onClearDay`,
  `onLogWorkout`, `onSelectExercise`) implement child-to-parent
  communication so children never mutate state directly.

## Testing Strategy Per Component Type

- **Presentational UI components** (Button, Card, Badge, SearchBar, Modal):
  render + simulate events, assert callback props fire with correct args.
- **Feature components** (ExerciseCard/List/Detail/Filter, DayCard,
  WorkoutPlanner, WorkoutLog, LogEntry, ProgressChart): render with mock
  data, assert conditional rendering (loading/empty/error/completed states).
- **Media components**: mock `HTMLMediaElement.play/pause` (unsupported in
  jsdom) and assert the custom controls call them.
- **Routing components** (Navbar, App, ExerciseDetail): wrap in
  `MemoryRouter`, assert active-link classes, 404 fallback, and
  `useParams`-driven content.
- **Custom hook** (`useLocalStorage`): `renderHook`/`act` to verify state
  updates and localStorage writes.
- **Integration tests**: render the full `App` and simulate multi-step
  flows (browse → add to plan → view planner; log a workout → view
  progress) to confirm cross-page data flow.
