import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./WorkoutDetailsPage.css";

function WorkoutDetailsPage() {
  const { workoutId } = useParams();

  const [workout, setWorkout] = useState(null);
  const [allExercises, setAllExercises] = useState([]);
  const [selectedExerciseId, setSelectedExerciseId] = useState("");

  useEffect(() => {
    const savedWorkouts = JSON.parse(localStorage.getItem("workouts")) || [];
    const foundWorkout = savedWorkouts.find(
      (item) => item.id === Number(workoutId)
    );

    setWorkout(foundWorkout || null);
  }, [workoutId]);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await fetch(
          "https://lift-lab-6e701-default-rtdb.europe-west1.firebasedatabase.app/exercices.json"
        );
        const data = await response.json();

        // Firebase devuelve un objeto con una key rara y dentro el array
        const exercisesArray = Object.values(data)[0] || [];
        setAllExercises(exercisesArray);
      } catch (error) {
        console.log("Error fetching exercises:", error);
      }
    };

    fetchExercises();
  }, []);

  const handleAddExercise = () => {
    if (!selectedExerciseId || !workout) return;

    const selectedExercise = allExercises.find(
      (exercise) => exercise.id === Number(selectedExerciseId)
    );

    if (!selectedExercise) return;

    const updatedWorkout = {
      ...workout,
      exercises: [...workout.exercises, selectedExercise],
    };

    const savedWorkouts = JSON.parse(localStorage.getItem("workouts")) || [];

    const updatedWorkouts = savedWorkouts.map((item) =>
      item.id === workout.id ? updatedWorkout : item
    );

    localStorage.setItem("workouts", JSON.stringify(updatedWorkouts));
    setWorkout(updatedWorkout);
    setSelectedExerciseId("");
  };

  if (!workout) {
    return <p>Workout not found.</p>;
  }

  return (
    <div className="workout-details-page">
      <h1>{workout.name}</h1>

      <div className="add-exercise-box">
        <select
          value={selectedExerciseId}
          onChange={(e) => setSelectedExerciseId(e.target.value)}
        >
          <option value="">Select an exercise</option>
          {allExercises.map((exercise) => (
            <option key={exercise.id} value={exercise.id}>
              {exercise.name} - {exercise.muscleGroup}
            </option>
          ))}
        </select>

        <button onClick={handleAddExercise}>Add exercise</button>
      </div>

      <div className="exercise-list">
        {workout.exercises.length > 0 ? (
          workout.exercises.map((exercise, index) => (
            <div key={index} className="exercise-card">
              <h3>{exercise.name}</h3>
              <p>Muscle group: {exercise.muscleGroup}</p>
            </div>
          ))
        ) : (
          <p>No exercises added yet.</p>
        )}
      </div>
    </div>
  );
}

export default WorkoutDetailsPage;