import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navigation/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import ExercisesPage from './pages/ExercisesPage';
import ExerciseDetail from './components/Exercise/ExerciseDetail';
import WorkoutPlannerPage from './pages/WorkoutPlannerPage';
import HistoryPage from './pages/HistoryPage';
import ProgressPage from './pages/ProgressPage';
import NotFound from './pages/NotFound';
import useLocalStorage from './hooks/useLocalStorage';
import { exercisesData, daysOfWeek } from './data/exercisesData';
import './App.css';

// Builds the initial empty workout plan object, one empty array per day
const emptyPlan = daysOfWeek.reduce((plan, day) => ({ ...plan, [day]: [] }), {});

// App is the top-level component. It owns state that is shared across
// multiple pages/routes (lifting state up) and passes it, along with
// handler callbacks, down to each page as props.
function App() {
  const navigate = useNavigate();
  const [exercises, setExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Persisted state: survives page refreshes via localStorage
  const [workoutPlan, setWorkoutPlan] = useState(emptyPlan);
  const [workoutHistory, setWorkoutHistory] = useLocalStorage('workoutHistory', []);
  const [savedPlan, setSavedPlan] = useLocalStorage('workoutPlan', emptyPlan);

  // Load exercise data on mount (simulates an async data fetch)
  useEffect(() => {
    const timer = setTimeout(() => {
      setExercises(exercisesData);
      setIsLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  // Hydrate the workout plan from localStorage on mount
  useEffect(() => {
    setWorkoutPlan(savedPlan);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep localStorage in sync whenever the plan changes
  useEffect(() => {
    setSavedPlan(workoutPlan);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workoutPlan]);

  // Child-to-parent callback: add an exercise to a specific day
  const handleAddToWorkout = (exercise, day = 'monday') => {
    setWorkoutPlan((prev) => ({
      ...prev,
      [day]: [...prev[day], exercise],
    }));
  };

  // Child-to-parent callback: remove one exercise from a day by index
  const handleRemoveExercise = (day, index) => {
    setWorkoutPlan((prev) => ({
      ...prev,
      [day]: prev[day].filter((_, i) => i !== index),
    }));
  };

  // Child-to-parent callback: clear all exercises from a day
  const handleClearDay = (day) => {
    setWorkoutPlan((prev) => ({ ...prev, [day]: [] }));
  };

  // Child-to-parent callback: append a completed workout to history
  const handleLogWorkout = (entry) => {
    setWorkoutHistory((prev) => [...prev, entry]);
  };

  // Programmatic navigation: jump to an exercise's detail page when selected
  const handleSelectExercise = (id) => {
    navigate(`/exercises/${id}`);
  };

  // All exercise ids currently present anywhere in the plan (for badges)
  const planExerciseIds = Object.values(workoutPlan).flat().map((ex) => ex.id);

  return (
    <div className="app">
      <Navbar />
      <main className="appMain">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/exercises"
            element={
              <ExercisesPage
                exercises={exercises}
                isLoading={isLoading}
                onSelectExercise={handleSelectExercise}
                onAddToWorkout={handleAddToWorkout}
                planExerciseIds={planExerciseIds}
              />
            }
          />
          <Route path="/exercises/:id" element={<ExerciseDetail exercises={exercises} />} />
          <Route
            path="/workout-planner"
            element={
              <WorkoutPlannerPage
                workoutPlan={workoutPlan}
                onRemoveExercise={handleRemoveExercise}
                onClearDay={handleClearDay}
              />
            }
          />
          <Route
            path="/history"
            element={
              <HistoryPage exercises={exercises} workoutHistory={workoutHistory} onLogWorkout={handleLogWorkout} />
            }
          />
          <Route path="/progress" element={<ProgressPage workoutHistory={workoutHistory} workoutPlan={workoutPlan} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
