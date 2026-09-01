import React, { useState, useEffect } from 'react';

function Header() {
  const [dateTime, setDateTime] = useState({
    dateStr: '',
    timeStr: ''
  });

  const [weather, setWeather] = useState({
    temp: '35 °C',
    condition: 'Sunny',
    heatIndex: '40.6%',
    humidity: '45%',
    wind: '12.2 km/h'
  });

  useEffect(() => {
    const updateClock = () => {
      const date = new Date();
      const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

      const dayName = days[date.getDay()];
      const dayNum = date.getDate();
      const monthName = months[date.getMonth()];
      const year = date.getFullYear();

      let hours = date.getHours();
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';

      hours = hours % 12;
      hours = hours ? hours : 12; // 0 hour should be 12
      const formattedHours = String(hours).padStart(2, '0');

      setDateTime({
        dateStr: `${dayNum} ${monthName}, ${year}`,
        timeStr: `${dayName}, ${formattedHours} : ${minutes} : ${seconds} ${ampm}`
      });
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const apiKey = "f2481a7bd81e4dc2b61135152252412";
        const city = "Phagwara";
        const res = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`);
        if (res.ok) {
          const data = await res.json();
          setWeather({
            temp: `${Math.floor(data.current.temp_c)} °C`,
            condition: data.current.condition.text,
            heatIndex: `${data.current.heatindex_c ? data.current.heatindex_c : 40.6}%`,
            humidity: `${data.current.humidity}%`,
            wind: `${data.current.wind_kph} km/h`
          });
        }
      } catch (err) {
        console.warn("Weather API fetch error, using default data", err);
      }
    };

    fetchWeather();
  }, []);

  return (
    <header className="header">
      <div className="header1">
        <h2>{dateTime.dateStr || '1 September, 2026'}</h2>
        <h1>{dateTime.timeStr || 'Tuesday, 06 : 25 : 33 PM'}</h1>
        <h4>Phagwara (Punjab)</h4>
      </div>
      <div className="header2">
        <h2>{weather.temp}</h2>
        <h4>{weather.condition}</h4>
        <h3 className="precipitation">Heat Index: {weather.heatIndex}</h3>
        <h3 className="humidity">Humidity: {weather.humidity}</h3>
        <h3 className="wind">Wind: {weather.wind}</h3>
      </div>
    </header>
  );
}

export default Header;
