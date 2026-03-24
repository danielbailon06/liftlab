function WorkoutCard({ workout, isSelected, onSelect }) {
  return (
    <div
      className={`workout-card ${isSelected ? "selected" : ""}`}
      onClick={() => onSelect(workout.id)}
    >
      <h2>{workout.name}</h2>
    </div>
  );
}

export default WorkoutCard;