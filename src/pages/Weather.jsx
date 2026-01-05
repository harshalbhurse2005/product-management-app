import { useState, useEffect, useCallback } from 'react';

const Weather = () => {
  const [city, setCity] = useState('Nagpur');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  // 1. Weather fetch karne ka main function
  const fetchWeatherData = useCallback(async (cityName) => {
    if (!cityName) return;

    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error("City not found. Try again!");
      }

      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  }, [API_KEY]);

  // 2. Page load hote hi default city (Nagpur) ka weather dikhana
  useEffect(() => {
    fetchWeatherData('Nagpur');
  }, [fetchWeatherData]);

  // 3. Form submit handle karna
  const handleSearch = (e) => {
    e.preventDefault();
    fetchWeatherData(city);
  };

  return (
    <div className="container">
      <h1>☁️ Weather Explorer</h1>
      
      <form onSubmit={handleSearch} className="search-container" style={{display: 'flex', gap: '10px'}}>
        <input 
          type="text" 
          placeholder="Enter city..." 
          className="search-input"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit" className="edit-btn" style={{flex: '0 0 auto', width: '150px'}}>
          Get Weather
        </button>
      </form>

      {loading && <p className="text-muted">Searching the clouds... ✈️</p>}
      
      {error && (
        <div style={{color: 'var(--danger)', padding: '10px', fontWeight: 'bold'}}>
          ⚠️ {error}
        </div>
      )}

      {weather && !loading && (
        <div className="product-card" style={{maxWidth: '450px', margin: '30px auto', textAlign: 'center'}}>
          <h2 style={{color: 'var(--primary)', marginBottom: '5px'}}>
            {weather.name}, {weather.sys.country}
          </h2>
          
          <img 
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} 
            alt="weather icon" 
            style={{width: '120px', filter: 'drop-shadow(0 0 10px rgba(99, 102, 241, 0.3))'}}
          />
          
          <h1 style={{fontSize: '4rem', margin: '0', color: 'var(--text-main)'}}>
            {Math.round(weather.main.temp)}°C
          </h1>
          <p style={{fontSize: '1.1rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px'}}>
            {weather.weather[0].description}
          </p>

          <div style={{
            display: 'flex', 
            justifyContent: 'space-between', 
            marginTop: '30px', 
            padding: '20px 0',
            borderTop: '1px solid var(--border-color)'
          }}>
            <div>
              <p style={{margin: '0', color: 'var(--text-muted)', fontSize: '0.9rem'}}>Humidity</p>
              <strong style={{fontSize: '1.3rem'}}>{weather.main.humidity}%</strong>
            </div>
            <div style={{borderLeft: '1px solid var(--border-color)', height: '40px'}}></div>
            <div>
              <p style={{margin: '0', color: 'var(--text-muted)', fontSize: '0.9rem'}}>Wind Speed</p>
              <strong style={{fontSize: '1.3rem'}}>{weather.wind.speed} m/s</strong>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
