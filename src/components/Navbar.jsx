import React, { useState } from 'react';
import { FaPalette, FaTimes } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import '../styles/navbar.css';
import { FiSettings } from 'react-icons/fi';
import SettingsModal from './SettingsModal';

const Navbar = () => {
  const { theme, setTheme, themes } = useTheme();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleThemeChange = (themeName) => {
    setTheme(themeName);
    setIsDropdownOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-logo">Pomodoro</h1>
        <div className="theme-dropdown">
          <button 
            className="theme-toggle" 
            onClick={toggleDropdown}
            aria-label="Change theme"
          >
            <FaPalette />
          </button>
          
          {isDropdownOpen && (
            <div className="theme-dropdown-menu">
              <div className="theme-dropdown-header">
                <span>Select Theme</span>
                <button 
                  className="close-button"
                  onClick={() => setIsDropdownOpen(false)}
                  aria-label="Close"
                >
                  <FaTimes />
                </button>
              </div>
              {Object.entries(themes).map(([key, themeData]) => (
                <button
                  key={key}
                  className={`theme-option ${theme === key ? 'active' : ''}`}
                  onClick={() => handleThemeChange(key)}
                >
                  <span 
                    className="theme-color-dot" 
                    style={{ backgroundColor: themeData.colors.primary }}
                  />
                  <span className="theme-name">
                    {themeData.name.charAt(0).toUpperCase() + themeData.name.slice(1)}
                  </span>
                </button>
                
              ))}
            </div>
          )}
        </div>
        <button 
          className="settings-button" 
          aria-label="Settings"
          onClick={() => setIsSettingsOpen(true)}
        >
          <FiSettings size={24} />
        </button>
        <SettingsModal 
          isOpen={isSettingsOpen} 
          onClose={() => setIsSettingsOpen(false)} 
        />
      </div>
    </nav>
  );
};

export default Navbar;