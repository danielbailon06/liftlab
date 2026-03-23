import Sidebar from "./components/Sidebar";
import WorkoutsPage from "./pages/WorkoutsPage";
import "./App.css";

function App() {
  return (
    <div className="app-layout">
      <Sidebar />
      <WorkoutsPage />
    </div>
  );
}

export default App;