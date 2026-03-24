import WorkoutCard from "./WorkoutCard";

function WorkoutGrid({
  workouts,
  selectedWorkoutId,
  onSelectWorkout,
  onCreateWorkout,
}) {
  return (
    <section className="workouts-grid">
      <button className="workout-card create-card" onClick={onCreateWorkout}>
        <span className="create-plus">+</span>
        <h2>Create workout</h2>
        <p>Build your own routine</p>
      </button>

      {workouts.map((workout) => (
        <WorkoutCard
          key={workout.id}
          workout={workout}
          isSelected={selectedWorkoutId === workout.id}
          onSelect={onSelectWorkout}
        />
      ))}
    </section>
  );
}

export default WorkoutGrid;