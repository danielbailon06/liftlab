import { useEffect, useState } from "react";
import "./HomePage.css";

function HomePage() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const savedWorkouts = localStorage.getItem("workouts");
    if (savedWorkouts) {
      setWorkouts(JSON.parse(savedWorkouts));
    }
  }, []);

  return (
    <div className="home-page">
      <h1 className="home-title">Workouts</h1>

      {workouts.length > 0 ? (
        <section className="home-workouts-grid">
          {workouts.map((workout) => (
            <div key={workout.id} className="home-workout-card">
              <h2>{workout.name}</h2>
              <p>
                {workout.exercises.length} exercise
                {workout.exercises.length !== 1 ? "s" : ""}
              </p>
            </div>
          ))}
        </section>
      ) : (
        <p className="home-empty-text">No workouts created yet.</p>
      )}
    </div>
  );
}

export default HomePage;