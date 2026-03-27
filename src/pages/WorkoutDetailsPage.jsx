import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./WorkoutDetailsPage.css";

function WorkoutDetailsPage() {
  const { workoutId } = useParams();
  const navigate = useNavigate();

  const isNewWorkout = workoutId === undefined;

  const [workout, setWorkout] = useState({
    name: "",
    description: "",
    exercises: [],
  });

  const [allExercises, setAllExercises] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [newExerciseName, setNewExerciseName] = useState("");
  const [newExerciseMuscle, setNewExerciseMuscle] = useState("");

  useEffect(() => {
    if (isNewWorkout) {
      setWorkout({
        name: "",
        description: "",
        exercises: [],
      });
      return;
    }

    axios
      .get(
        `https://lift-lab-6e701-default-rtdb.europe-west1.firebasedatabase.app/workouts/${workoutId}.json`
      )
      .then((response) => {
        if (!response.data) {
          setWorkout(null);
          return;
        }

        setWorkout({
          id: workoutId,
          name: response.data.name || "",
          description: response.data.description || "",
          exercises: response.data.exercises || [],
        });
      })
      .catch((error) => {
        console.log("Error fetching workout:", error);
      });
  }, [workoutId, isNewWorkout]);

  useEffect(() => {
    axios
      .get(
        "https://lift-lab-6e701-default-rtdb.europe-west1.firebasedatabase.app/exercices.json"
      )
      .then((response) => {
        const data = response.data;

        if (!data) {
          setAllExercises([]);
          return;
        }

        const exercisesArray = Object.values(data)[0] || [];
        setAllExercises(exercisesArray);
      })
      .catch((error) => {
        console.log("Error fetching exercises:", error);
      });
  }, []);

  const handleWorkoutFieldChange = (event) => {
    const { name, value } = event.target;

    setWorkout((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddExercise = (selectedExercise) => {
    if (!selectedExercise || !workout) return;

    const newExercise = {
      ...selectedExercise,
      sets: "",
      reps: "",
    };

    setWorkout((prev) => ({
      ...prev,
      exercises: [...prev.exercises, newExercise],
    }));

    setSearchTerm("");
  };

  const handleExerciseFieldChange = (index, field, value) => {
    const updatedExercises = [...workout.exercises];
    updatedExercises[index] = {
      ...updatedExercises[index],
      [field]: value,
    };

    setWorkout((prev) => ({
      ...prev,
      exercises: updatedExercises,
    }));
  };

  const handleDeleteExercise = (exerciseIndex) => {
    const updatedExercises = workout.exercises.filter(
      (_, index) => index !== exerciseIndex
    );

    setWorkout((prev) => ({
      ...prev,
      exercises: updatedExercises,
    }));
  };

  const handleSaveWorkout = () => {
    const workoutData = {
      name: workout.name,
      description: workout.description,
      exercises: workout.exercises,
    };

    if (isNewWorkout) {
      axios
        .post(
          "https://lift-lab-6e701-default-rtdb.europe-west1.firebasedatabase.app/workouts.json",
          workoutData
        )
        .then(() => {
          navigate("/");
        })
        .catch((error) => {
          console.log("Error creating workout:", error);
        });
    } else {
      axios
        .patch(
          `https://lift-lab-6e701-default-rtdb.europe-west1.firebasedatabase.app/workouts/${workoutId}.json`,
          workoutData
        )
        .then(() => {
          navigate("/");
        })
        .catch((error) => {
          console.log("Error updating workout:", error);
        });
    }
  };

  const handleCreateCustomExercise = () => {
    if (!newExerciseName.trim() || !newExerciseMuscle.trim()) return;

    const newExercise = {
      id: Date.now(),
      name: newExerciseName,
      muscleGroup: newExerciseMuscle,
    };

    axios
      .get(
        "https://lift-lab-6e701-default-rtdb.europe-west1.firebasedatabase.app/exercices.json"
      )
      .then((response) => {
        const data = response.data;

        if (!data) return;

        const firstKey = Object.keys(data)[0];
        const currentArray = Object.values(data)[0] || [];
        const updatedArray = [...currentArray, newExercise];

        return axios.put(
          `https://lift-lab-6e701-default-rtdb.europe-west1.firebasedatabase.app/exercices/${firstKey}.json`,
          updatedArray
        );
      })
      .then(() => {
        setAllExercises((prev) => [...prev, newExercise]);
        setNewExerciseName("");
        setNewExerciseMuscle("");
      })
      .catch((error) => {
        console.log("Error creating custom exercise:", error);
      });
  };

  if (!workout) {
    return (
      <div className="workout-details-page">
        <p>Loading...</p>
      </div>
    );
  }

  const filteredExercises = allExercises.filter((exercise) => {
    const nameMatch = exercise.name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());

    const muscleMatch = exercise.muscleGroup
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());

    return searchTerm.trim() !== "" && (nameMatch || muscleMatch);
  });

  return (
    <div className="workout-details-page">
      <h1 className="details-title">
        {isNewWorkout ? "Create workout" : "Workout details"}
      </h1>

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
        <input
          type="text"
          placeholder="Search exercise..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {searchTerm.trim() !== "" && (
          <div className="search-results">
            {filteredExercises.length > 0 ? (
              filteredExercises.map((exercise, index) => (
                <div key={index} className="search-result-item">
                  <div>
                    <strong>{exercise.name}</strong>
                    <p>{exercise.muscleGroup}</p>
                  </div>

                  <button onClick={() => handleAddExercise(exercise)}>
                    Add
                  </button>
                </div>
              ))
            ) : (
              <p className="no-results-text">No exercises found.</p>
            )}
          </div>
        )}
      </div>

      <div className="custom-exercise-box">
        <h3>Create custom exercise</h3>

        <input
          type="text"
          placeholder="Exercise name"
          value={newExerciseName}
          onChange={(e) => setNewExerciseName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Muscle group"
          value={newExerciseMuscle}
          onChange={(e) => setNewExerciseMuscle(e.target.value)}
        />

        <button onClick={handleCreateCustomExercise}>Create exercise</button>
      </div>

      <div className="exercise-list">
        {workout.exercises?.length > 0 ? (
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

      <div className="save-container">
        <button className="save-workout-btn" onClick={handleSaveWorkout}>
          {isNewWorkout ? "Save workout" : "Save changes"}
        </button>
      </div>
    </div>
  );
}

export default WorkoutDetailsPage;