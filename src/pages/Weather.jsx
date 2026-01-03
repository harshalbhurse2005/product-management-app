import { useState } from 'react';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_KEY = "0e765e3e7e8a5c4e09169b9dd0f7e14a"; // Aapki Active Key

  const fetchWeather = async (e) => {
    e.preventDefault();
    if (!city) return;

    setLoading(true);
    setError('');
    setWeather(null);

    try {
      // 1. API ko request bhejna
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      
      // 2. Agar city galat ho toh error handle karna
      if (!response.ok) {
        throw new Error("City not found. Try again!");
      }

      // 3. Response ko JSON format mein convert karna
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>☁️ Weather Explorer</h1>
      
      <form onSubmit={fetchWeather} className="search-container">
        <input 
          type="text" 
          placeholder="Enter city (e.g. Nagpur, London)..." 
          className="search-input"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit" className="edit-btn" style={{maxWidth: '120px', marginLeft: '10px'}}>
          Get Weather
        </button>
      </form>

      {/* States handle karna: Loading aur Error */}
      {loading && <p>Searching the clouds... ✈️</p>}
      {error && <p style={{color: '#cf6679', fontWeight: 'bold'}}>{error}</p>}

      {/* Weather Data Display: Agar data mil jaye tabhi dikhana */}
      {weather && (
        <div className="product-card" style={{maxWidth: '450px', margin: '30px auto', textAlign: 'center'}}>
          <h2 style={{color: '#bb86fc'}}>{weather.name}, {weather.sys.country}</h2>
          
          <img 
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} 
            alt="weather icon" 
            style={{width: '100px'}}
          />
          
          <h1 style={{fontSize: '4rem', margin: '0'}}>{Math.round(weather.main.temp)}°C</h1>
          <p style={{fontSize: '1.2rem', color: '#aaa'}}>{weather.weather[0].description.toUpperCase()}</p>

          <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '30px', padding: '0 20px'}}>
            <div>
              <p style={{marginBottom: '5px'}}>Humidity</p>
              <strong style={{fontSize: '1.2rem'}}>{weather.main.humidity}%</strong>
            </div>
            <div style={{borderLeft: '1px solid #333', height: '40px'}}></div>
            <div>
              <p style={{marginBottom: '5px'}}>Wind Speed</p>
              <strong style={{fontSize: '1.2rem'}}>{weather.wind.speed} m/s</strong>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;