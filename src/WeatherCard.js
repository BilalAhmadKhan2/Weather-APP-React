import React from 'react';
import { Card, Image } from 'react-bootstrap';
import './font.css';
import './App.css';
import './Card.css';

const WeatherCard = ({ title, value, symbol, icon }) => {
  return (
    <Card className="weather-card" style={{ width: '18rem' }}>
      <Card.Body style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ marginRight: '10px' }}>
          <Card.Title>{title}</Card.Title>
          <Card.Text>
            {value} {symbol}
          </Card.Text>
        </div>
        {icon && <img src={icon} alt={title} style={{ width: '48px' }} />}
      </Card.Body>
    </Card>
  );
};

const TemperatureCard = ({ cityName, region, localTime, temperature, temperatureUnit, icon, condition }) => {
  return (
    <Card className="weather-card" style={{ width: '18rem' }}>
      <Card.Body>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <div style={{ flex: 1, borderRight: '1px solid #000', paddingRight: '10px', textAlign: 'center' }}>
            {icon && <Image src={icon} alt="Weather icon" style={{ width: '90px', height: '90px', marginBottom: '10px' }} />}
            <div>
              <strong style={{ fontSize: '1.5em' }}>{temperature} {temperatureUnit}</strong>
            </div>
          </div>
          <div style={{ flex: 1, paddingLeft: '10px', textAlign: 'left' }}>
            <Card.Title style={{ fontWeight: 'bold', fontSize: '1.2em', marginBottom: '5px' }}>{cityName}</Card.Title>
            <Card.Subtitle>{region}</Card.Subtitle>
            <Card.Subtitle>{localTime}</Card.Subtitle>
            <p>{condition}</p>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export { WeatherCard, TemperatureCard };
