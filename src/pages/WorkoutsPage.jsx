import { useState } from "react";
import "./WorkoutsPage.css";

function WorkoutsPage() {
  const [workouts, setWorkouts] = useState([]);
  const [selectedWorkoutId, setSelectedWorkoutId] = useState(null);

  const selectedWorkout =
    workouts.find((workout) => workout.id === selectedWorkoutId) || null;

  const handleCreateWorkout = () => {
    const workoutName = prompt("Enter workout name:");

    if (!workoutName || !workoutName.trim()) return;

    const newWorkout = {
      id: Date.now(),
      name: workoutName.trim().toUpperCase(),
      exercises: [],
    };

    setWorkouts((prevWorkouts) => [...prevWorkouts, newWorkout]);
    setSelectedWorkoutId(newWorkout.id);
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

        <section className="workouts-grid">
          <button className="workout-card create-card" onClick={handleCreateWorkout}>
            <span className="create-plus">+</span>
            <h2>Create workout</h2>
            <p>Build your own routine</p>
          </button>

          {workouts.map((workout) => (
            <div
              key={workout.id}
              className={`workout-card ${
                selectedWorkoutId === workout.id ? "selected" : ""
              }`}
              onClick={() => setSelectedWorkoutId(workout.id)}
            >
              <h2>{workout.name}</h2>
            </div>
          ))}
        </section>
      </main>

      <aside className="workout-preview">
        {selectedWorkout ? (
          <>
            <h2 className="preview-title">{selectedWorkout.name}</h2>

            <div className="preview-exercises">
              {selectedWorkout.exercises.length > 0 ? (
                selectedWorkout.exercises.map((exercise, index) => (
                  <div key={index} className="preview-exercise-box">
                    {exercise}
                  </div>
                ))
              ) : (
                <p className="no-exercises-text">No exercises added yet.</p>
              )}
            </div>

            <div className="preview-buttons">
              <button className="preview-btn details-btn">Details</button>
              <button
                className="preview-btn delete-btn"
                onClick={handleDeleteWorkout}
              >
                Delete
              </button>
            </div>
          </>
        ) : (
          <div className="empty-preview">
            <h2 className="preview-title">No workouts yet</h2>
            <p>Create your first workout to get started.</p>
          </div>
        )}
      </aside>
    </div>
  );
}

export default WorkoutsPage;