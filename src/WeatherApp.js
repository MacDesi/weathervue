import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './WeatherApp.css';
import logo from './WeatherVueLogo.png';

const WeatherApp = () => { //Defining component function
  // State variables to store weather data, loading state, error state, unit of temperature, and selected city
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCelsius, setIsCelsius] = useState(true);
  const [city, setCity] = useState('London'); // Default city is set to London

  useEffect(() => {
    // Fetch weather data based on the selected city
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.weatherapi.com/v1/current.json?key=d6644edd136f4b9f9d4175758232105&q=${city}`
        );
        setWeatherData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [city]);

  const handleToggleUnit = () => {
    // Toggle between Celsius and Fahrenheit units
    setIsCelsius(!isCelsius);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Fetch weather data for the entered city
    setCity(e.target.city.value);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  const celsiusToFahrenheit = (celsius) => {
    // Convert Celsius temperature to Fahrenheit
    return Math.round((celsius * 9) / 5 + 32); // Round the Fahrenheit temperature to the nearest whole number
  };

  return (
    <div className="weather-app">
      {/* Render the logo */}
      <img src={logo} alt="Weather App Logo" className="logo" />
      {/* Render the search form */}
      <form className="search-form" onSubmit={handleSearch}>
        <input type="text" name="city" placeholder="Enter city" />
        <button type="submit">Search</button>
      </form>
      {/* Render the weather information */}
      {weatherData && (
        <div className="weather-info">
          {/* Render the location name */}
          <h2 className="location-name">{weatherData.location.name}</h2>
          {/* Render the temperature */}
          <p className="temperature">
            {isCelsius
              ? `${weatherData.current.temp_c}°C`
              : `${celsiusToFahrenheit(weatherData.current.temp_c)}°F`}
          </p>
          {/* Render the condition */}
          <p className="condition">Condition: {weatherData.current.condition.text}</p>
          {/* Render the unit toggle button */}
          <button className="unit-toggle-btn" onClick={handleToggleUnit}>
            {isCelsius ? 'Fahrenheit' : 'Celsius'}
          </button>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;


