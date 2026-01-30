
import { useSettings } from './context/SettingsContext';
import Navbar from './components/Navbar';
import { ThemeProvider } from './context/ThemeContext';
import { SettingsProvider } from './context/SettingsContext';
import ModeSwitcher from './components/ModeSwitcher';
import TimerDisplay from './components/TimerDisplay';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <SettingsProvider>
        <AppContent />
      </SettingsProvider>
    </ThemeProvider>
  );
}

function AppContent() {
  const { mode, switchMode } = useSettings();
  return (
    <div className="app">
      <Navbar />
      <ModeSwitcher />
      <TimerDisplay onComplete={() => mode === 'focus' ? switchMode('break') : switchMode('focus') } />
    </div>
  );
}

export default App;