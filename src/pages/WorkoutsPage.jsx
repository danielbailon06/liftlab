import { useState, useEffect } from "react";
import axios from "axios";
import "./WorkoutsPage.css";
import WorkoutGrid from "../components/WorkoutGrid";
import WorkoutPreview from "../components/WorkoutPreview";

function WorkoutsPage() {
  const [workouts, setWorkouts] = useState([]);
  const [selectedWorkoutId, setSelectedWorkoutId] = useState(null);

  const loadWorkouts = () => {
    axios
      .get(
        "https://lift-lab-6e701-default-rtdb.europe-west1.firebasedatabase.app/workouts.json"
      )
      .then((response) => {
        const data = response.data;

        if (!data) {
          setWorkouts([]);
          setSelectedWorkoutId(null);
          return;
        }

        const workoutsArray = Object.keys(data).map((key) => ({
          id: key,
          name: data[key].name || "",
          description: data[key].description || "",
          exercises: data[key].exercises || [],
        }));

        setWorkouts(workoutsArray);
      })
      .catch((error) => {
        console.log("Error getting workouts:", error);
      });
  };

  useEffect(() => {
    loadWorkouts();
  }, []);

  useEffect(() => {
    if (workouts.length === 0) {
      setSelectedWorkoutId(null);
      return;
    }

    const selectedStillExists = workouts.some(
      (workout) => workout.id === selectedWorkoutId
    );

    if (!selectedWorkoutId || !selectedStillExists) {
      setSelectedWorkoutId(workouts[0].id);
    }
  }, [workouts, selectedWorkoutId]);

  const selectedWorkout =
    workouts.find((workout) => workout.id === selectedWorkoutId) || null;

  const handleCreateWorkout = () => {
    const newWorkout = {
      name: "",
      description: "",
      exercises: [],
    };

    axios
      .post(
        "https://lift-lab-6e701-default-rtdb.europe-west1.firebasedatabase.app/workouts.json",
        newWorkout
      )
      .then((response) => {
        const newId = response.data.name;
        loadWorkouts();
        setSelectedWorkoutId(newId);
      })
      .catch((error) => {
        console.log("Error creating workout:", error);
      });
  };

  const handleDeleteWorkout = () => {
    if (!selectedWorkout) return;

    axios
      .delete(
        `https://lift-lab-6e701-default-rtdb.europe-west1.firebasedatabase.app/workouts/${selectedWorkout.id}.json`
      )
      .then(() => {
        loadWorkouts();
      })
      .catch((error) => {
        console.log("Error deleting workout:", error);
      });
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