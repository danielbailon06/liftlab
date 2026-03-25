import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./WorkoutsPage.css";
import WorkoutGrid from "../components/WorkoutGrid";
import WorkoutPreview from "../components/WorkoutPreview";

function WorkoutsPage() {
  const [workouts, setWorkouts] = useState(() => {
    const saved = localStorage.getItem("workouts");
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedWorkoutId, setSelectedWorkoutId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("workouts", JSON.stringify(workouts));
  }, [workouts]);

  const selectedWorkout =
    workouts.find((workout) => workout.id === selectedWorkoutId) || null;

  const handleCreateWorkout = () => {
    const newWorkout = {
      id: Date.now(),
      name: "",
      description: "",
      exercises: [],
    };

    setWorkouts((prevWorkouts) => [...prevWorkouts, newWorkout]);
    setSelectedWorkoutId(newWorkout.id);
    navigate(`/workouts/${newWorkout.id}`);
  };

  const handleDeleteWorkout = () => {
    if (!selectedWorkout) return;

    const updatedWorkouts = workouts.filter(
      (workout) => workout.id !== selectedWorkout.id
    );

    setWorkouts(updatedWorkouts);

    if (updatedWorkouts.length > 0) {
      setSelectedWorkoutId(updatedWorkouts[0].id);
    } else {
      setSelectedWorkoutId(null);
    }
  };

  return (
    <div className="workouts-page-content">
      <main className="workouts-main">
        <h1 className="workouts-title">My workouts</h1>

        <WorkoutGrid
          workouts={workouts}
          selectedWorkoutId={selectedWorkoutId}
          onSelectWorkout={setSelectedWorkoutId}
          onCreateWorkout={handleCreateWorkout}
        />
      </main>

      <WorkoutPreview
        selectedWorkout={selectedWorkout}
        onDeleteWorkout={handleDeleteWorkout}
      />
    </div>
  );
}

export default WorkoutsPage;