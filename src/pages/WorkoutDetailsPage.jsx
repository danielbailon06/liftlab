import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
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
        const response = await axios.get(
          "https://lift-lab-6e701-default-rtdb.europe-west1.firebasedatabase.app/exercices.json"
        );

        const exercisesArray = Object.values(response.data)[0] || [];
        setAllExercises(exercisesArray);
      } catch (error) {
        console.log("Error fetching exercises:", error);
      }
    };

    fetchExercises();
  }, []);

  const updateWorkoutInStorage = (updatedWorkout) => {
    const savedWorkouts = JSON.parse(localStorage.getItem("workouts")) || [];

    const updatedWorkouts = savedWorkouts.map((item) =>
      item.id === updatedWorkout.id ? updatedWorkout : item
    );

    localStorage.setItem("workouts", JSON.stringify(updatedWorkouts));
    setWorkout(updatedWorkout);
  };

  const handleWorkoutFieldChange = (event) => {
    const { name, value } = event.target;

    const updatedWorkout = {
      ...workout,
      [name]: value,
    };

    updateWorkoutInStorage(updatedWorkout);
  };

  const handleAddExercise = () => {
    if (!selectedExerciseId || !workout) return;

    const selectedExercise = allExercises.find(
      (exercise) => exercise.id === Number(selectedExerciseId)
    );

    if (!selectedExercise) return;

    const newExercise = {
      ...selectedExercise,
      sets: "",
      reps: "",
    };

    const updatedWorkout = {
      ...workout,
      exercises: [...workout.exercises, newExercise],
    };

    updateWorkoutInStorage(updatedWorkout);
    setSelectedExerciseId("");
  };

  const handleExerciseFieldChange = (index, field, value) => {
    const updatedExercises = [...workout.exercises];
    updatedExercises[index] = {
      ...updatedExercises[index],
      [field]: value,
    };

    const updatedWorkout = {
      ...workout,
      exercises: updatedExercises,
    };

    updateWorkoutInStorage(updatedWorkout);
  };

  const handleDeleteExercise = (exerciseIndex) => {
    const updatedExercises = workout.exercises.filter(
      (_, index) => index !== exerciseIndex
    );

    const updatedWorkout = {
      ...workout,
      exercises: updatedExercises,
    };

    updateWorkoutInStorage(updatedWorkout);
  };

  if (!workout) {
    return <p className="workout-details-page">Workout not found.</p>;
  }

  return (
    <div className="workout-details-page">
      <h1 className="details-title">Workout details</h1>

      <div className="workout-form">
        <div className="form-group">
          <label htmlFor="name">Workout name</label>
          <input
            id="name"
            type="text"
            name="name"
            value={workout.name}
            onChange={handleWorkoutFieldChange}
            placeholder="e.g. Push Day"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={workout.description}
            onChange={handleWorkoutFieldChange}
            placeholder="e.g. Chest, shoulders and triceps"
            rows="4"
          />
        </div>
      </div>

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
              <div className="exercise-top">
                <div>
                  <h3>{exercise.name}</h3>
                  <p>{exercise.muscleGroup}</p>
                </div>

                <button
                  className="delete-exercise-btn"
                  onClick={() => handleDeleteExercise(index)}
                >
                  Delete
                </button>
              </div>

              <div className="exercise-config">
                <div className="form-group small">
                  <label>Sets</label>
                  <input
                    type="number"
                    min="1"
                    value={exercise.sets}
                    onChange={(e) =>
                      handleExerciseFieldChange(index, "sets", e.target.value)
                    }
                    placeholder="4"
                  />
                </div>

                <div className="form-group small">
                  <label>Reps</label>
                  <input
                    type="number"
                    min="1"
                    value={exercise.reps}
                    onChange={(e) =>
                      handleExerciseFieldChange(index, "reps", e.target.value)
                    }
                    placeholder="10"
                  />
                </div>
              </div>
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