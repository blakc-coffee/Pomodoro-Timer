// src/App.js
import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/navbar';
import TimerDisplay from './components/TimerDisplay';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <div className="app">
        <Navbar />
        <TimerDisplay />
      </div>
    </ThemeProvider>
  );
}

export default App; 