import "./Sidebar.css";
import logo from "../assets/LIFT LAB.png";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-top">
        <img src={logo} alt="LiftLab logo" className="sidebar-logo" />
        <h2>Lift Lab</h2>
      </div>

      <div className="sidebar-links">
        <a href="/">Home</a>
        <a href="/routines">Routines</a>
        <a href="/profile">Profile</a>
      </div>
    </div>
  );
}

export default Sidebar;