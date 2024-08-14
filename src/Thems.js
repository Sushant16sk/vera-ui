import React, { useState, useEffect } from 'react';
import './theme.css';

const Theme = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.body.className = theme; // Apply the theme to the body element
  }, [theme]);

  const handleThemeChange = (selectedTheme) => {
    setTheme(selectedTheme);
  };

  return (
    <div className="theme-page">
      <h1>Select Theme</h1>
      <div className="theme-options">
        <button
          className={`theme-option light ${theme === 'light' ? 'selected' : ''}`}
          onClick={() => handleThemeChange('light')}
        >
          Light Theme
        </button>
        <button
          className={`theme-option dark ${theme === 'dark' ? 'selected' : ''}`}
          onClick={() => handleThemeChange('dark')}
        >
          Dark Theme
        </button>
      </div>
    </div>
  );
};

export default Theme;
