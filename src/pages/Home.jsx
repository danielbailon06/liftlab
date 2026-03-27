import { useEffect, useState } from "react";
import axios from "axios";
import "./HomePage.css";

function getMuscleStatsArray(workouts) {
  const stats = {};

  workouts.forEach((workout) => {
    workout.exercises?.forEach((exercise) => {
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
    axios
      .get(
        "https://lift-lab-6e701-default-rtdb.europe-west1.firebasedatabase.app/workouts.json"
      )
      .then((response) => {
        const data = response.data;

        if (!data) {
          setWorkouts([]);
          return;
        }

        const workoutsArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));

        setWorkouts(workoutsArray);
      })
      .catch((error) => {
        console.log("Error loading workouts:", error);
      });
  }, []);

  const stats = getMuscleStatsArray(workouts);

  const totalWorkouts = workouts.length;
  const totalExercises = workouts.reduce(
    (acc, w) => acc + (w.exercises?.length || 0),
    0
  );
  const avgExercises =
    totalWorkouts > 0 ? Math.round(totalExercises / totalWorkouts) : 0;
  const topMuscle = stats[0]?.muscle || "-";

  const recentWorkouts = [...workouts].slice(-3).reverse();

  return (
    <div className="home-page">
      <h1 className="home-title">Dashboard</h1>

      <section className="stats-cards">
        <div className="stat-card">
          <h3>{totalWorkouts}</h3>
          <p>Workouts</p>
        </div>

        <div className="stat-card">
          <h3>{totalExercises}</h3>
          <p>Exercises</p>
        </div>

        <div className="stat-card">
          <h3>{avgExercises}</h3>
          <p>Avg / Workout</p>
        </div>

        <div className="stat-card">
          <h3>{topMuscle}</h3>
          <p>Top Muscle</p>
        </div>
      </section>

      <section className="recent-section">
        <h2 className="section-title">Recent Workouts</h2>

        {recentWorkouts.length > 0 ? (
          <div className="recent-grid">
            {recentWorkouts.map((workout) => (
              <div key={workout.id} className="recent-card">
                <h3>{workout.name || "Untitled workout"}</h3>
                <p>{workout.description || "No description"}</p>
                <span>
                  {workout.exercises?.length || 0} exercises
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="home-empty-text">No workouts yet.</p>
        )}
      </section>
    </div>
  );
}

export default HomePage;