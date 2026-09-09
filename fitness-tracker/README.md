# FitTrack — Fitness Tracker & Workout Planner

A responsive React application that lets gym members browse exercises, plan a
weekly workout schedule, log completed workouts, watch demonstration videos,
listen to motivational audio, and track their progress over time.

## Features

- Browse and search exercises by name; filter by category, muscle group, and difficulty
- Detailed exercise pages with step-by-step instructions and a demonstration video
- Motivational audio tracks on the Home page
- Weekly (Monday–Sunday) workout planner — add/remove exercises per day, clear a day
- Workout logging with sets/reps/weight, saved to history
- Progress dashboard: total workouts, planned exercises, volume, and day streak
- Responsive navigation with active-route highlighting and a mobile hamburger menu
- Loading, empty, and error states throughout
- Data persistence via `localStorage` for the workout plan and history
- 65 automated tests (component, integration, hook, routing, async) with >90% line coverage

## Technologies Used

React 18, React Router v6, PropTypes, Vite, Jest, React Testing Library.

## Installation

```bash
npm install
npm start        # runs the Vite dev server
npm test         # runs the Jest test suite
npm test:coverage
```

## Project Structure

```
src/
├── components/
│   ├── Navigation/   Navbar (routing + active link styling)
│   ├── Exercise/      ExerciseCard, ExerciseList, ExerciseDetail, ExerciseFilter
│   ├── WorkoutPlanner/ WorkoutPlanner, DayCard
│   ├── WorkoutLog/     WorkoutLog, LogEntry, ProgressChart
│   ├── Media/          VideoPlayer, AudioPlayer
│   ├── UI/             Button, Card, Badge, SearchBar, Modal (reusable)
│   └── common/         Header, Footer, Loading, EmptyState
├── pages/               Home, ExercisesPage, WorkoutPlannerPage, HistoryPage,
│                        ProgressPage, NotFound
├── hooks/                useLocalStorage (custom persistence hook)
├── data/                 exercisesData.js (21 sample exercises), audioTracks
├── utils/                helpers.js (formatting, filtering, calculations)
├── __tests__/integration/ WorkoutFlow.test.js, Navigation.test.js
├── App.jsx, main.jsx, App.css, setupTests.js
```

## Component Hierarchy

```
App
├── Navbar
├── Routes
│   ├── Home → AudioPlayer (x2)
│   ├── ExercisesPage → ExerciseFilter (→ SearchBar) → ExerciseList → ExerciseCard (→ Card, Badge, Button)
│   ├── ExerciseDetail → VideoPlayer
│   ├── WorkoutPlannerPage → WorkoutPlanner → DayCard (x7, → Card, Button)
│   ├── HistoryPage → WorkoutLog → LogEntry
│   ├── ProgressPage → ProgressChart
│   └── NotFound
└── Footer
```

## State Management

- **App.jsx** owns the shared state used by multiple pages (lifted up):
  `exercises`, `isLoading`, `workoutPlan`, `workoutHistory`.
- `workoutPlan` and `workoutHistory` persist through the custom
  `useLocalStorage` hook, which mirrors `useState` but syncs to
  `localStorage` on every change and hydrates on mount.
- Page-local state (search/filter values, log-entry form fields) lives in the
  page/component that needs it, avoiding unnecessary prop drilling.
- Data flows down via props; user actions flow back up via callback props
  (`onAddToWorkout`, `onRemoveExercise`, `onLogWorkout`, `onSelectExercise`).
- Sibling communication (e.g. ExercisesPage and WorkoutPlannerPage) happens
  through the shared `workoutPlan` state in `App`.

## Testing Strategy

| Layer | Approach |
|---|---|
| UI components (Button, Card, SearchBar, Modal, Badge) | Render + fireEvent interaction tests, mock callback props |
| Exercise/Planner/Log components | Render with mock data, assert conditional states (loading/empty/error) |
| Custom hook (`useLocalStorage`) | `renderHook`/`act` to verify persistence behaviour |
| Routing (`Navbar`, `App`, `ExerciseDetail`) | `MemoryRouter`, assert active link styling, 404 fallback, `useParams` |
| Integration (`__tests__/integration`) | Full `App` render, simulate multi-step user flows across pages |
| Async | `waitFor` around the simulated exercise-loading `useEffect` |

Run `npm test -- --coverage` to reproduce the report below.

## Test Coverage Report

```
All files            |   90.9  |   84.48  |   78.46 |   93.03
```
- 65 tests across 23 test files — all passing
- Line coverage 93.03%, branch coverage 84.48% (both exceed the 70% requirement)

## Routing

| Path | Page |
|---|---|
| `/` | Home |
| `/exercises` | ExercisesPage (search/filter/list) |
| `/exercises/:id` | ExerciseDetail (dynamic route) |
| `/workout-planner` | WorkoutPlannerPage |
| `/history` | HistoryPage |
| `/progress` | ProgressPage |
| `*` | NotFound (404) |

Programmatic navigation (`useNavigate`) is used when selecting an exercise
card and from the "Back" and "Go Home" buttons.

## Future Enhancements

- Backend API + auth so plans/history sync across devices
- Charting library (e.g. Recharts) for richer progress visualizations
- Exercise favoriting and custom workout templates
- Push/email reminders for planned workout days

## Screenshots

See `/screenshots` for Home, Exercises (with filters), Exercise Detail
(with video), Workout Planner, History, Progress, mobile view, and the test
coverage report. (Add screenshots after running `npm start` locally.)
