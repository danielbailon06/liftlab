function WorkoutCard({ workout, isSelected, onSelect }) {
    return (
        <div
            className={`workout-card ${isSelected ? "selected" : ""}`}
            onClick={() => onSelect(workout.id)}
        >
            <h2>{workout.name}</h2>
            <p className="card-subtitle">
                {workout.description || "No description"}
            </p>
        </div>
    );
}

export default WorkoutCard;