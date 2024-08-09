// Settings.js
import React from 'react';
import { useTheme } from './assets/components/ThemeContext';
import './style.css';

const Settings = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className={`settings-page ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <h1>Settings Page</h1>
      <label className="switch">
        <input type="checkbox" checked={isDarkMode} onChange={toggleTheme} />
        <span className="slider round"></span>
      </label>
      <span>{isDarkMode ? 'Dark Mode' : 'Light Mode'}</span>
    </div>
  );
};

export default Settings;
