
import React, { createContext, useState, useEffect, useContext } from 'react';

export const themes = {
  light: {
    name: 'light',
    colors: {
      primary: '#AD8B73',   
      secondary: '#CEAB93', 
      tertiary: '#E3CAA5',   
      quaternary: '#FFFBE9',  
    }
  },
  blue: {
    name: 'blue',
    colors: {
      primary: '#0F2854',
      secondary: '#1C4D8D',
      tertiary: '#4988C4',
      quaternary: '#BDE8F5',
    }
  },
  green: {
    name: 'green',
    colors: {
      primary: '#1A3636',
      secondary: '#40534C',
      tertiary: '#677D6A',
      quaternary: '#D6BD98',
    }
  },
  pink: {
    name: 'pink',
    colors: {
      primary: '#FCF5EE',
      secondary: '#FFC4C4',
      tertiary: '#EE6983',
      quaternary: '#850E35'
    }
  },
  burgundy : {
    name: 'burgundy',
    colors: {
      primary: '#662222',
      secondary: '#842A3B',
      tertiary: '#A3485A',
      quaternary: '#F5DAA7',
    }
  }
};
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(themes.light);
  const [themeName, setThemeName] = useState('light');

  const setThemeMode = (mode) => {
    if (themes[mode]) {
      setTheme(themes[mode]);
      setThemeName(mode);
      localStorage.setItem('theme', mode);
      document.documentElement.setAttribute('data-theme', mode);
    }
  };

  const toggleTheme = () => {
    const themeKeys = Object.keys(themes);
    const currentIndex = themeKeys.indexOf(themeName);
    const nextIndex = (currentIndex + 1) % themeKeys.length;
    setThemeMode(themeKeys[nextIndex]);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setThemeMode(savedTheme);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, themeName, toggleTheme, setTheme: setThemeMode, themes }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};