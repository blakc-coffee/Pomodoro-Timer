import { useState, useEffect, useRef, useCallback } from 'react';

export const useTimer = (initialTime ,onComplete) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const timerRef = useRef(null);
  const initialTimeRef = useRef(initialTime);

  useEffect(() => {
    initialTimeRef.current = initialTime;
  }, [initialTime]);

  const start = useCallback(() => {
    setIsRunning(true);
    setIsStarted(true);
  }, []);

  const pause = useCallback(() => {
    setIsRunning(false);  
    
  }, []);

  const reset = useCallback((newTime) => {
    setIsRunning(false);
    setIsStarted(false);
    setTimeLeft(newTime ?? initialTimeRef.current);
  }, []);

useEffect(() => {
  if (!isRunning) return;

  timerRef.current = setInterval(() => {
    setTimeLeft(prev => {
      if (prev <= 1) {
        clearInterval(timerRef.current);
        timerRef.current = null;
        setIsRunning(false);
        setIsStarted(false);
        onComplete();
        setTimeout(() => setIsRunning(true), 100);
        return 0;
      }
      return prev - 1;
    });
  }, 1000);

  return () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };
}, [isRunning, onComplete]);


   const formatTime = useCallback((seconds) => {
    const time = seconds !== undefined ? seconds : timeLeft;
    const mins = Math.floor(time / 60).toString().padStart(2, '0');
    const secs = (time % 60).toString().padStart(2, '0');
    return { mins, secs, formatted: `${mins}:${secs}` };
  }, [timeLeft]);

  return {
    timeLeft,
    isRunning,
    isStarted ,
    start,
    pause,
    reset,
    formatTime,
    setTime: setTimeLeft
  };
};