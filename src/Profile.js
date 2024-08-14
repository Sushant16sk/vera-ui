import React, { useState } from 'react';
import './style.css';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    nickname: 'Johnny',
    email: 'john.doe@example.com',
    password: '********',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    console.log('Profile saved:', profileData);
    // Add logic here to save the profile data
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    // Optionally reset to initial values if changes should be discarded
  };

  return (
    <div className="profile-card">
      <h2 className="profile-title">Profile</h2>
      <div className="profile-details">
        <div className="profile-field">
          <span className="profile-label">Name:</span>
          <span className="profile-value">
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={profileData.name}
                onChange={handleInputChange}
              />
            ) : (
              profileData.name
            )}
          </span>
        </div>
        <div className="profile-field">
          <span className="profile-label">Nickname:</span>
          <span className="profile-value">
            {isEditing ? (
              <input
                type="text"
                name="nickname"
                value={profileData.nickname}
                onChange={handleInputChange}
              />
            ) : (
              profileData.nickname
            )}
          </span>
        </div>
        <div className="profile-field">
          <span className="profile-label">Email:</span>
          <span className="profile-value">
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={profileData.email}
                onChange={handleInputChange}
              />
            ) : (
              profileData.email
            )}
          </span>
        </div>
        <div className="profile-field">
          <span className="profile-label">Password:</span>
          <span className="profile-value">
            {isEditing ? (
              <input
                type="password"
                name="password"
                value={profileData.password}
                onChange={handleInputChange}
              />
            ) : (
              profileData.password
            )}
          </span>
        </div>
      </div>
      <div className="profile-actions">
        {!isEditing ? (
          <button className="button edit-button" onClick={handleEditClick}>
            Edit
          </button>
        ) : (
          <>
            <button className="button save-button" onClick={handleSaveClick}>
              Save
            </button>
            <button className="button cancel-button" onClick={handleCancelClick}>
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;