import React, { useState, useEffect } from 'react';

function Header() {
  const [timeState, setTimeState] = useState({
    time: '',
    date: ''
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const optionsDate = { day: 'numeric', month: 'long', year: 'numeric' };
      const optionsTime = { weekday: 'long', hour: 'numeric', minute: '2-digit', hour12: true };
      
      setTimeState({
        date: now.toLocaleDateString('en-US', optionsDate),
        time: now.toLocaleDateString('en-US', optionsTime)
      });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="dashboard-header">
      <div className="header-time">
        <h2>{timeState.date || 'Today'}</h2>
        <h1>{timeState.time || '12:00 PM'}</h1>
        <h4>Phagwara (Punjab)</h4>
      </div>
      <div className="header-weather">
        <h2>20 °C</h2>
        <h4>Light Rain</h4>
        <div className="weather-details">
          <span>Precipitation 0%</span>
          <span>Humidity 47%</span>
          <span>Wind 7.02 KpH</span>
        </div>
      </div>
    </header>
  );
}

export default Header;
