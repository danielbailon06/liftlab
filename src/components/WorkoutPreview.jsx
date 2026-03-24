import { useNavigate } from "react-router-dom";

function WorkoutPreview({ selectedWorkout, onDeleteWorkout }) {
  const navigate = useNavigate();

  return (
    <aside className="workout-preview">
      {selectedWorkout ? (
        <>
          <h2 className="preview-title">{selectedWorkout.name}</h2>

          <div className="preview-exercises">
            {selectedWorkout.exercises.length > 0 ? (
              selectedWorkout.exercises.map((exercise, index) => (
                <div key={index} className="preview-exercise-box">
                  {exercise.name}
                </div>
              ))
            ) : (
              <p className="no-exercises-text">No exercises added yet.</p>
            )}
          </div>

          <div className="preview-buttons">
            <button
              className="preview-btn details-btn"
              onClick={() => navigate(`/workouts/${selectedWorkout.id}`)}
            >
              Details
            </button>

            <button
              className="preview-btn delete-btn"
              onClick={onDeleteWorkout}
            >
              Delete
            </button>
          </div>
        </>
      ) : (
        <div className="empty-preview">
          <h2 className="preview-title">Workout</h2>
          <p>Create or select a workout to start tracking!</p>
        </div>
      )}
    </aside>
  );
}

export default WorkoutPreview;