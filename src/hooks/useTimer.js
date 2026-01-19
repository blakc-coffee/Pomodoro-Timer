
import { useState, useEffect, useRef, useCallback } from 'react';

export const useTimer = (initialTime) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  const start = useCallback(() => {
    if (!isRunning) {
      setIsRunning(true);
    }
  }, [isRunning]);

  const pause = useCallback(() => {
    if (isRunning) {
      setIsRunning(false);
    }
  }, [isRunning]);

  const reset = useCallback((newTime = initialTime) => {
    setIsRunning(false);
    setTimeLeft(newTime);
  }, [initialTime]);


  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime <= 1) {
            clearInterval(timerRef.current);
            setIsRunning(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timerRef.current);
  }, [isRunning]);

 
  const formatTime = useCallback((seconds = timeLeft) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return { mins, secs, formatted: `${mins}:${secs}` };
  }, [timeLeft]);

  return {
    timeLeft,
    isRunning,
    start,
    pause,
    reset,
    formatTime,
    setTime: setTimeLeft
  };
};