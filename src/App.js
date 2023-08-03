import React, { useState } from 'react';
import axios from 'axios';
import { API_KEY, API_URL } from './constants';
import SearchBar from './SearchBar';
import { TemperatureCard } from './WeatherCard';
import './App.css';
import WeatherData from './WeatherData';
import Forecast from './Forecast';
import './font.css';
import './Card.css';
import TempChart from './TempChart';


function App() {
  const [query, setQuery] = useState('');
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state


  // Convert the date to words
  const dateToWords = (localtime) => {
    const months = [
      "January",
      "Feburary",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "Octuber",
      "November",
      "December",
    ];

    const [date, time] = localtime.split(' ');
    const [year, month, dateNum] = date.split('-');
    const wordDate = `${months[parseInt(month, 10) - 1]} ${dateNum}, ${year}`;

    return `${wordDate} ${time}`; 
  };

  const search = () => {
    setLoading(true); 
    const currentWeatherUrl = `${API_URL}?key=${API_KEY}&q=${query}&days=7&aqi=yes&alerts=no`;

    axios
      .get(currentWeatherUrl)
      .then(response => {
        const { current, location } = response.data; 
        if (current && location) {
          setCurrentWeather({
            ...current,
            location: location 
          });
          setForecastData(response.data.forecast ? response.data.forecast.forecastday : []);
          setErrorMessage(null);
        } else {
          throw new Error('Location or weather data not found');
        }
      })
      .catch(error => {
        console.log('Error:', error);
        setErrorMessage(error.message);
        setCurrentWeather(null);
        setForecastData([]);
      })
      .finally(() => {
        setLoading(false); 
      });
  };
  const temps = [];
  forecastData.length > 0 &&
    forecastData[0].hour.map((hour) => {
      temps.push(hour.temp_c);
      return null; 
    });

  const eightTemps =
    forecastData.length > 0
      ? forecastData[0].hour.map((hour) => hour.temp_c).filter((_, i) => i % 3 === 0)
      : [];
  const nineTemps = [
    ...eightTemps,
    forecastData.length > 0 ? forecastData[0].hour[forecastData[0].hour.length - 1].temp_c : null,
  ];


  return (
    <div className="App fontstyle">
      <header className="py-3 custom-bg-color">
        <nav className="navbar navbar-expand container justify-content-between custom-bg-color">
          <SearchBar query={query} setQuery={setQuery} search={search} />
        </nav>
      </header>


      <div className="mb-4">
        {loading && <p className='load-message'>Loading...</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>

      {currentWeather && (
        <div className="container">
          <div className="row">
            <div className="col-lg-6 current-weather">
              <TemperatureCard
                cityName={currentWeather.location.name}
                region={`${currentWeather.location.region}/${currentWeather.location.country}`}
                localTime={dateToWords(currentWeather.location.localtime)}
                temperature={currentWeather.temp_c.toFixed(2)}
                temperatureUnit="°C"
                icon={`http:${currentWeather.condition.icon}`}
                condition={currentWeather.condition.text}
              />
            </div>
            <div className="col-lg-6 forecast-container">
              <Forecast forecastData={forecastData} />
            </div>
          </div>
          {currentWeather && (
            <WeatherData weatherData={currentWeather} />
          )}
          <div className="row">
            <div className="col-12 mb-4">
              <TempChart tempsData={nineTemps} />
            </div>

          </div>
        </div>
      )}

      <footer className="py-3 custom-bg-color text-center text-white">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Weather App. All rights reserved. Designed and build by Bilal Ahmad Khan with React.js, Bootstrap, CSS, Chart.js and WeatherAPI.</p>
        </div>
      </footer>

    </div>
  );
}

export default App;
