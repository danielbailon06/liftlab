import { useEffect, useState } from "react";
import "./HomePage.css";

function getMuscleStatsArray(workouts) {
  const stats = {};

  workouts.forEach((workout) => {
    workout.exercises.forEach((exercise) => {
      const muscle = exercise.muscleGroup;

      if (stats[muscle]) {
        stats[muscle] += 1;
      } else {
        stats[muscle] = 1;
      }
    });
  });

  return Object.entries(stats)
    .map(([muscle, count]) => ({ muscle, count }))
    .sort((a, b) => b.count - a.count);
}

function HomePage() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const savedWorkouts = localStorage.getItem("workouts");
    if (savedWorkouts) {
      setWorkouts(JSON.parse(savedWorkouts));
    }
  }, []);

  const stats = getMuscleStatsArray(workouts);
  const total = stats.reduce((acc, item) => acc + item.count, 0);

  return (
    <div className="home-page">
      <h1 className="home-title">Workouts</h1>

      {workouts.length > 0 ? (
        <section className="home-workouts-grid">
          {workouts.map((workout) => (
            <div key={workout.id} className="home-workout-card">
              <h2>{workout.name || "Untitled workout"}</h2>
              <p>{workout.description || "No description"}</p>
            </div>
          ))}
        </section>
      ) : (
        <p className="home-empty-text">No workouts created yet.</p>
      )}

      <section className="home-stats-section">
        <h2 className="home-stats-title">Most trained muscles</h2>

        {stats.length > 0 ? (
          <div className="stats-container">
            {stats.map((item) => (
              <div key={item.muscle} className="stat-row">
                <span className="stat-label">{item.muscle}</span>

                <div className="stat-bar">
                  <div
                    className="stat-fill"
                    style={{ width: `${(item.count / total) * 100}%` }}
                  />
                </div>

                <span className="stat-value">
                  {Math.round((item.count / total) * 100)}%
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="home-empty-text">No exercise data yet.</p>
        )}
      </section>
    </div>
  );
}

export default HomePage;