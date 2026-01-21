import React from 'react';
import { useSettings } from '../context/SettingsContext';
import { useTheme } from '../context/ThemeContext';
import '../styles/ModeSwitcher.css';

const ModeSwitcher = () => {
  const { mode, switchMode } = useSettings();
  const { theme } = useTheme();

  return (
    <div className="mode-switcher" style={{ backgroundColor: theme.colors.secondary }}>
      <button
        className={`mode-button ${mode === 'focus' ? 'active' : ''}`}
        onClick={() => switchMode('focus')}
        style={{
          backgroundColor: mode === 'focus' ? theme.colors.tertiary : 'transparent',
          color: mode === 'focus' ? theme.colors.quaternary : theme.colors.quaternary,
        }}
      >
        Focus
      </button>
      <button
        className={`mode-button ${mode === 'break' ? 'active' : ''}`}
        onClick={() => switchMode('break')}
        style={{
          backgroundColor: mode === 'break' ? theme.colors.tertiary : 'transparent',
          color: mode === 'break' ? theme.colors.quaternary : theme.colors.quaternary,
        }}
      >
        Break
      </button>
    </div>
  );
};

export default ModeSwitcher;
