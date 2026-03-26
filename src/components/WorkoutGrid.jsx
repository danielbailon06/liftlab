function WorkoutGrid({
  workouts,
  selectedWorkoutId,
  onSelectWorkout,
  onCreateWorkout,
}) {
  return (
    <div className="workouts-grid">
      <div className="workout-card create-card" onClick={onCreateWorkout}>
        <div className="create-plus">+</div>
        <h2>Create workout</h2>
        <p>Start a new routine</p>
      </div>

      {workouts.map((workout) => {
        const exercisesCount = workout.exercises?.length || 0;

        return (
          <div
            key={workout.id}
            className={`workout-card ${
              selectedWorkoutId === workout.id ? "selected" : ""
            }`}
            onClick={() => onSelectWorkout(workout.id)}
          >
            <h2>{workout.name?.trim() ? workout.name : "Untitled workout"}</h2>

            <p>
              {workout.description?.trim()
                ? workout.description
                : "No description yet"}
            </p>

            <p>{exercisesCount} exercise{exercisesCount !== 1 ? "s" : ""}</p>
          </div>
        );
      })}
    </div>
  );
}

export default WorkoutGrid;