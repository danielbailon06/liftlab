import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import WorkoutsPage from "./pages/WorkoutsPage.jsx";
import WorkoutDetailsPage from "./pages/WorkoutDetailsPage";
import Profile from "./pages/Profile";
import "./App.css";

function App() {
  return (
    <>
      <Sidebar />

      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/workouts" element={<WorkoutsPage />} />
          <Route path="/workouts/:workoutId" element={<WorkoutDetailsPage />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </>
  );
}

export default App;