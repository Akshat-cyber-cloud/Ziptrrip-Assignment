import React, { useState, useEffect } from 'react';

function PomodoroTimerModal({ onClose }) {
  const [totalSeconds, setTotalSeconds] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    let timer = null;
    if (isRunning && totalSeconds > 0) {
      timer = setInterval(() => {
        setTotalSeconds(prev => prev - 1);
      }, 1000);
    } else if (totalSeconds === 0 && isRunning) {
      setIsRunning(false);
      setMessage('🎉 Congrats on completing 25 minutes of study!');
    }
    return () => clearInterval(timer);
  }, [isRunning, totalSeconds]);

  const formatTime = () => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const handleStart = () => {
    if (totalSeconds > 0) {
      setMessage('');
      setIsRunning(true);
    }
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTotalSeconds(25 * 60);
    setMessage('');
  };

  return (
    <div className="fullElem active">
      <button className="back" onClick={onClose} title="Close">
        &times;
      </button>
      <h2>Study With Me</h2>
      <div className="pomodoro-page">
        <div className="pomo-timer">
          <h1>{formatTime()}</h1>
          <button className="start-timer" onClick={handleStart}>Start</button>
          <button className="pause-timer" onClick={handlePause}>Pause</button>
          <button className="reset-timer" onClick={handleReset}>Reset</button>
        </div>
        {message && <p className="pomo-message">{message}</p>}
      </div>
    </div>
  );
}

export default PomodoroTimerModal;
