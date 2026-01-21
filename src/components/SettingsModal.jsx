import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useSettings } from '../context/SettingsContext';
import { useTheme } from '../context/ThemeContext';
import '../styles/SettingsModal.css';

const SettingsModal = ({ isOpen, onClose }) => {
  const { focusDuration, breakDuration, updateFocusDuration, updateBreakDuration } = useSettings();
  const { theme } = useTheme();
  
  const [focusMinutes, setFocusMinutes] = useState(Math.floor(focusDuration / 60));
  const [focusSeconds, setFocusSeconds] = useState(focusDuration % 60);
  const [breakMinutes, setBreakMinutes] = useState(Math.floor(breakDuration / 60));
  const [breakSeconds, setBreakSeconds] = useState(breakDuration % 60);
  
  const [errors, setErrors] = useState({ 
    focusMinutes: '', 
    focusSeconds: '', 
    breakMinutes: '', 
    breakSeconds: '' 
  });

  useEffect(() => {
    if (isOpen) {
      setFocusMinutes(Math.floor(focusDuration / 60));
      setFocusSeconds(focusDuration % 60);
      setBreakMinutes(Math.floor(breakDuration / 60));
      setBreakSeconds(breakDuration % 60);
      setErrors({ 
        focusMinutes: '', 
        focusSeconds: '', 
        breakMinutes: '', 
        breakSeconds: '' 
      });
    }
  }, [isOpen, focusDuration, breakDuration]);

  const validateInput = (value, type) => {
    const numValue = parseInt(value, 10);
    if (isNaN(numValue) || numValue < 0) {
      return `${type} must be a non-negative number`;
    }
    if (type === 'seconds' && numValue >= 60) {
      return 'Seconds must be less than 60';
    }
    return '';
  };

  const handleFocusMinutesChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      setFocusMinutes(value === '' ? 0 : parseInt(value, 10));
      setErrors(prev => ({ ...prev, focusMinutes: '' }));
    }
  };

  const handleFocusSecondsChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      const numValue = value === '' ? 0 : parseInt(value, 10);
      setFocusSeconds(numValue);
      const error = validateInput(numValue, 'seconds');
      setErrors(prev => ({ ...prev, focusSeconds: error }));
    }
  };

  const handleBreakMinutesChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      setBreakMinutes(value === '' ? 0 : parseInt(value, 10));
      setErrors(prev => ({ ...prev, breakMinutes: '' }));
    }
  };

  const handleBreakSecondsChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      const numValue = value === '' ? 0 : parseInt(value, 10);
      setBreakSeconds(numValue);
      const error = validateInput(numValue, 'seconds');
      setErrors(prev => ({ ...prev, breakSeconds: error }));
    }
  };

  const handleBlur = (type) => {
    if (type === 'focusMinutes') {
      const error = validateInput(focusMinutes, 'minutes');
      setErrors(prev => ({ ...prev, focusMinutes: error }));
    } else if (type === 'focusSeconds') {
      const error = validateInput(focusSeconds, 'seconds');
      setErrors(prev => ({ ...prev, focusSeconds: error }));
    } else if (type === 'breakMinutes') {
      const error = validateInput(breakMinutes, 'minutes');
      setErrors(prev => ({ ...prev, breakMinutes: error }));
    } else if (type === 'breakSeconds') {
      const error = validateInput(breakSeconds, 'seconds');
      setErrors(prev => ({ ...prev, breakSeconds: error }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const focusMinsError = validateInput(focusMinutes, 'minutes');
    const focusSecsError = validateInput(focusSeconds, 'seconds');
    const breakMinsError = validateInput(breakMinutes, 'minutes');
    const breakSecsError = validateInput(breakSeconds, 'seconds');
    
    if (focusMinsError || focusSecsError || breakMinsError || breakSecsError) {
      setErrors({ 
        focusMinutes: focusMinsError, 
        focusSeconds: focusSecsError,
        breakMinutes: breakMinsError,
        breakSeconds: breakSecsError
      });
      return;
    }

    const focusTotalSeconds = focusMinutes * 60 + focusSeconds;
    const breakTotalSeconds = breakMinutes * 60 + breakSeconds;
    
    if (focusTotalSeconds === 0) {
      setErrors(prev => ({ ...prev, focusSeconds: 'Total time must be greater than 0' }));
      return;
    }
    
    if (breakTotalSeconds === 0) {
      setErrors(prev => ({ ...prev, breakSeconds: 'Total time must be greater than 0' }));
      return;
    }

    updateFocusDuration(focusMinutes, focusSeconds);
    updateBreakDuration(breakMinutes, breakSeconds);
    onClose();
  };

  const handleReset = () => {
    setFocusMinutes(25);
    setFocusSeconds(0);
    setBreakMinutes(5);
    setBreakSeconds(0);
    setErrors({ 
      focusMinutes: '', 
      focusSeconds: '', 
      breakMinutes: '', 
      breakSeconds: '' 
    });
  };

  if (!isOpen) return null;

  return (
    <div className="settings-modal-overlay" onClick={onClose}>
      <div 
        className="settings-modal" 
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: theme.colors.quaternary,
          color: theme.colors.primary,
        }}
      >
        <div className="settings-modal-header">
          <h2>Timer Settings</h2>
          <button 
            className="settings-modal-close"
            onClick={onClose}
            aria-label="Close"
            style={{ color: theme.colors.primary }}
          >
            <FaTimes />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="settings-form">
          {/* Focus Time Settings */}
          <div className="settings-section">
            <h3 className="settings-section-title" style={{ color: theme.colors.primary }}>
              Focus Time
            </h3>
            <div className="settings-time-inputs">
              <div className="settings-input-group">
                <label htmlFor="focusMinutes" style={{ color: theme.colors.primary }}>
                  Minutes
                </label>
                <input
                  id="focusMinutes"
                  type="number"
                  min="0"
                  max="999"
                  value={focusMinutes}
                  onChange={handleFocusMinutesChange}
                  onBlur={() => handleBlur('focusMinutes')}
                  className={errors.focusMinutes ? 'error' : ''}
                  style={{
                    borderColor: errors.focusMinutes ? 'red' : theme.colors.secondary,
                    color: theme.colors.primary,
                    backgroundColor: theme.colors.quaternary,
                  }}
                />
                {errors.focusMinutes && (
                  <span className="error-message">{errors.focusMinutes}</span>
                )}
              </div>

              <div className="settings-input-group">
                <label htmlFor="focusSeconds" style={{ color: theme.colors.primary }}>
                  Seconds
                </label>
                <input
                  id="focusSeconds"
                  type="number"
                  min="0"
                  max="59"
                  value={focusSeconds}
                  onChange={handleFocusSecondsChange}
                  onBlur={() => handleBlur('focusSeconds')}
                  className={errors.focusSeconds ? 'error' : ''}
                  style={{
                    borderColor: errors.focusSeconds ? 'red' : theme.colors.secondary,
                    color: theme.colors.primary,
                    backgroundColor: theme.colors.quaternary,
                  }}
                />
                {errors.focusSeconds && (
                  <span className="error-message">{errors.focusSeconds}</span>
                )}
              </div>
            </div>
          </div>

          {/* Break Time Settings */}
          <div className="settings-section">
            <h3 className="settings-section-title" style={{ color: theme.colors.primary }}>
              Break Time
            </h3>
            <div className="settings-time-inputs">
              <div className="settings-input-group">
                <label htmlFor="breakMinutes" style={{ color: theme.colors.primary }}>
                  Minutes
                </label>
                <input
                  id="breakMinutes"
                  type="number"
                  min="0"
                  max="999"
                  value={breakMinutes}
                  onChange={handleBreakMinutesChange}
                  onBlur={() => handleBlur('breakMinutes')}
                  className={errors.breakMinutes ? 'error' : ''}
                  style={{
                    borderColor: errors.breakMinutes ? 'red' : theme.colors.secondary,
                    color: theme.colors.primary,
                    backgroundColor: theme.colors.quaternary,
                  }}
                />
                {errors.breakMinutes && (
                  <span className="error-message">{errors.breakMinutes}</span>
                )}
              </div>

              <div className="settings-input-group">
                <label htmlFor="breakSeconds" style={{ color: theme.colors.primary }}>
                  Seconds
                </label>
                <input
                  id="breakSeconds"
                  type="number"
                  min="0"
                  max="59"
                  value={breakSeconds}
                  onChange={handleBreakSecondsChange}
                  onBlur={() => handleBlur('breakSeconds')}
                  className={errors.breakSeconds ? 'error' : ''}
                  style={{
                    borderColor: errors.breakSeconds ? 'red' : theme.colors.secondary,
                    color: theme.colors.primary,
                    backgroundColor: theme.colors.quaternary,
                  }}
                />
                {errors.breakSeconds && (
                  <span className="error-message">{errors.breakSeconds}</span>
                )}
              </div>
            </div>
          </div>

          <div className="settings-buttons">
            <button
              type="button"
              onClick={handleReset}
              className="settings-button-reset"
              style={{
                backgroundColor: theme.colors.tertiary,
                color: theme.colors.quaternary,
              }}
            >
              Reset to Defaults (Focus: 25:00, Break: 5:00)
            </button>
            <div className="settings-submit-buttons">
              <button
                type="button"
                onClick={onClose}
                className="settings-button-cancel"
                style={{
                  backgroundColor: theme.colors.tertiary,
                  color: theme.colors.quaternary,
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="settings-button-save"
                style={{
                  backgroundColor: theme.colors.secondary,
                  color: theme.colors.quaternary,
                }}
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingsModal;
