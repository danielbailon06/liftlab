import "./Sidebar.css";
import logo from "../assets/LIFT LAB.png";
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-top">
        <img src={logo} alt="LiftLab logo" className="sidebar-logo" />
        <h2>Lift Lab</h2>
      </div>

      <div className="sidebar-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/workouts">Workouts</NavLink>
        <NavLink to="/profile">Profile</NavLink>
      </div>
    </div>
  );
}

export default Sidebar;