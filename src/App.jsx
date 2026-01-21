// src/App.js
import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { SettingsProvider } from './context/SettingsContext';
import Navbar from './components/navbar';
import ModeSwitcher from './components/ModeSwitcher';
import TimerDisplay from './components/TimerDisplay';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <SettingsProvider>
        <div className="app">
          <Navbar />
          <ModeSwitcher />
          <TimerDisplay />
        </div>
      </SettingsProvider>
    </ThemeProvider>
  );
}

export default App; 