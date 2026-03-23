import { useState } from "react";
import "./WorkoutsPage.css";

const initialWorkouts = [
    {
        id: 1,
        name: "PUSH DAY",
        subtitle: "PECHO, HOMBROS Y TRÍCEPS",
        exercises: ["Bench Press", "Incline Press", "Shoulder Press"],
    },
    {
        id: 2,
        name: "PULL DAY",
        subtitle: "ESPALDA Y BÍCEPS",
        exercises: ["Pull Ups", "Barbell Row", "Lat Pulldown"],
    },
    {
        id: 3,
        name: "LEG DAY",
        subtitle: "PIERNAS COMPLETAS",
        exercises: ["Squat", "Leg Press", "Hip Thrust"],
    },
    {
        id: 4,
        name: "UPPER DAY",
        subtitle: "TORSO COMPLETO",
        exercises: ["Bench Press", "Row", "Lateral Raise"],
    },
];

function WorkoutsPage() {
    const [workouts, setWorkouts] = useState(initialWorkouts);
    const [selectedWorkoutId, setSelectedWorkoutId] = useState(initialWorkouts[0].id);

    const selectedWorkout =
        workouts.find((w) => w.id === selectedWorkoutId) || null;

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
                    {workouts.map((workout) => (
                        <div
                            key={workout.id}
                            className={`workout-card ${selectedWorkoutId === workout.id ? "selected" : ""
                                }`}
                            onClick={() => setSelectedWorkoutId(workout.id)}
                        >
                            <h2>{workout.name}</h2>
                            <p>{workout.subtitle}</p>
                        </div>
                    ))}
                </section>
            </main>

            <aside className="workout-preview">
                {selectedWorkout ? (
                    <>
                        <h2 className="preview-title">{selectedWorkout.name}</h2>

                        <div className="preview-exercises">
                            {selectedWorkout.exercises.map((exercise, index) => (
                                <div key={index} className="preview-exercise-box">
                                    {exercise}
                                </div>
                            ))}
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
                        <h2 className="preview-title">No workouts</h2>
                        <p>Create a new routine to get started.</p>
                    </div>
                )}
            </aside>
        </div>
    );
}

export default WorkoutsPage;