import React from 'react';
import './font.css';
const ForecastList = ({ forecastData }) => {
  const getDayName = (dateString) => {
    const date = new Date(dateString);
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[date.getDay()];
  };

  return (
    <div className="card forecast-card fontstyle weather-card"> 
      <div className="card-body weather-card">
        <div className="row">
          {forecastData.map((forecast, index) => (
            <div key={index} className="col">
              <div className="forecast-day">
                <p className="forecast-date bold-text">{getDayName(forecast.date, index)}</p>
                <img
                  src={`http:${forecast.day.condition.icon}`}
                  alt={forecast.day.condition.text}
                  className="forecast-icon"
                />
                <div className="forecast-temperature">
                  <p className="smaller-text">H {forecast.day.maxtemp_c.toFixed(2)} °C</p>
                  <p className="smaller-text">L {forecast.day.mintemp_c.toFixed(2)} °C</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  

};

export default ForecastList;
