import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPalette, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import './style.css';

const Settings = () => {
  const [selectedOption, setSelectedOption] = useState('Profile');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.split('/').pop();
    if (path === 'theme' || path === 'profile' || path === 'sign-out') {
      setSelectedOption(path.charAt(0).toUpperCase() + path.slice(1)); // Capitalize the first letter
    }
  }, [location.pathname]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    switch (option) {
      case 'Profile':
        navigate('profile');
        break;
      case 'Theme':
        navigate('theme');
        break;
      case 'Sign Out':
        console.log('Sign Out clicked');
        // You might want to handle sign-out functionality here
        break;
      default:
        break;
    }
  };

  return (
    <div className="settings-page">
      <div className="settings-sidebar">
        <div className="settings-options">
          <button
            className={`settings-option ${selectedOption === 'Profile' ? 'selected' : ''}`}
            onClick={() => handleOptionClick('Profile')}
          >
            <FontAwesomeIcon icon={faUser} className="icon" /> Profile
          </button>
          <button
            className={`settings-option ${selectedOption === 'Theme' ? 'selected' : ''}`}
            onClick={() => handleOptionClick('Theme')}
          >
            <FontAwesomeIcon icon={faPalette} className="icon" /> Theme
          </button>
        </div>
        <button
          className={`settings-option sign-out ${selectedOption === 'Sign Out' ? 'selected' : ''}`}
          onClick={() => handleOptionClick('Sign Out')}
        >
          <FontAwesomeIcon icon={faSignOutAlt} className="icon" /> Sign Out
        </button>
      </div>
      <div className="settings-content">
        <Outlet />
      </div>
    </div>
  );
};

export default Settings;
