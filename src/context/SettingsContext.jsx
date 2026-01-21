import React, { createContext, useState, useEffect, useContext } from 'react';

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [focusDuration, setFocusDuration] = useState(25 * 60); // Default 25 minutes in seconds
  const [breakDuration, setBreakDuration] = useState(5 * 60); // Default 5 minutes in seconds
  const [mode, setMode] = useState('focus'); // 'focus' or 'break'

  useEffect(() => {
    // Load saved settings from localStorage
    const savedFocusDuration = localStorage.getItem('focusDuration');
    const savedBreakDuration = localStorage.getItem('breakDuration');
    const savedMode = localStorage.getItem('mode');
    
    if (savedFocusDuration) {
      setFocusDuration(parseInt(savedFocusDuration, 10));
    }
    if (savedBreakDuration) {
      setBreakDuration(parseInt(savedBreakDuration, 10));
    }
    if (savedMode && (savedMode === 'focus' || savedMode === 'break')) {
      setMode(savedMode);
    }
  }, []);

  const updateFocusDuration = (minutes, seconds = 0) => {
    const totalSeconds = minutes * 60 + seconds;
    if (totalSeconds > 0) {
      setFocusDuration(totalSeconds);
      localStorage.setItem('focusDuration', totalSeconds.toString());
    }
  };

  const updateBreakDuration = (minutes, seconds = 0) => {
    const totalSeconds = minutes * 60 + seconds;
    if (totalSeconds > 0) {
      setBreakDuration(totalSeconds);
      localStorage.setItem('breakDuration', totalSeconds.toString());
    }
  };

  const switchMode = (newMode) => {
    if (newMode === 'focus' || newMode === 'break') {
      setMode(newMode);
      localStorage.setItem('mode', newMode);
    }
  };

  // Get current duration based on mode
  const timerDuration = mode === 'focus' ? focusDuration : breakDuration;

  return (
    <SettingsContext.Provider value={{ 
      focusDuration, 
      breakDuration, 
      timerDuration,
      mode,
      updateFocusDuration, 
      updateBreakDuration,
      switchMode
    }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
