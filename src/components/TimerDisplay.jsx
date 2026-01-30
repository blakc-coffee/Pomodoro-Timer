import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import 'react-circular-progressbar/dist/styles.css';
import { FaRedo } from 'react-icons/fa';
import { useTimer } from '../hooks/useTimer';
import { useTheme } from '../context/ThemeContext';
import { useSettings } from '../context/SettingsContext';
import { useEffect } from 'react';
import "../styles/TimerDisplay.css";

const TimerDisplay = () => {
  const { timerDuration, } = useSettings();
  const {
    timeLeft,
    isRunning,
    isStarted,
    start,
    pause,
    reset,
    formatTime,
    setTime
  } = useTimer(timerDuration);
  
  
  useEffect(() => {
    
    if (!isRunning && !isStarted) {
      setTime(timerDuration);
    }
  }, [timerDuration, isRunning, setTime, isStarted]);

  const toggleTimer = () => {
    isRunning ? pause() : start();
  };
  const handleReset = () => {
    reset(timerDuration);
  };
  const { formatted: displayTime } = formatTime();
  const percentage = (timeLeft / timerDuration) * 100;
  const { theme } = useTheme();
  return (
    <div className='timer-container'>
      <div className='timer-wrapper'><CircularProgressbar
        value={percentage}
        text={displayTime}
        styles={buildStyles({
          rotation: 0.25,
          strokeLinecap: 'butt',
          textSize: '16px',
          pathTransitionDuration: 0.5,
          pathColor: theme.colors.secondary,
          textColor: theme.colors.quaternary,
          trailColor: theme.colors.tertiary,
        })} 
        /></div>
        <div className='buttons'>
          <button className='start-pause'onClick={toggleTimer}>
            <span>{ isRunning ? 'Pause' : 'Start'}</span>
          </button>
          <button className='reset' onClick={handleReset}><FaRedo /></button>

        </div>
    </div>
  );
};

export default TimerDisplay;