import "./Sidebar.css";
import logo from "../assets/LIFT LAB.png";
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-top">
        <NavLink to="/"><img src={logo} alt="LiftLab logo" className="sidebar-logo" /></NavLink>
        <h2>Lift Lab</h2>
      </div>

      <div className="sidebar-links">
        <NavLink to="/" className="sidebar-link">Home</NavLink>
        <NavLink to="/workouts" className="sidebar-link">Workouts</NavLink>
        <NavLink to="/profile"className="sidebar-link">Profile</NavLink>
      </div>
    </div>
  );
}

export default Sidebar;