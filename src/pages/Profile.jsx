import "./Profile.css";

function Profile() {
  return (
    <div className="profile-page">
      <div className="profile-card">
        <h1 className="profile-title">Profile</h1>

        <h2 className="profile-subtitle">Feature not available yet</h2>

        <p className="profile-text">
          Authentication and user profiles will be available soon.
        </p>

        <p className="profile-text secondary">
          Stay tuned — this feature is coming in the next version.
        </p>

        <button className="profile-disabled-btn" disabled>
          Edit Profile (coming soon)
        </button>
      </div>
    </div>
  );
}

export default Profile;