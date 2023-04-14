import React from "react";
import "./currentWeather.css";

const CurrentWeather = ({ data }) => {
  const toFahrenheit = (kelvin) => {
    return Math.ceil(((+kelvin - 273.15) * 9) / 5 + 32);
  };

  const toMilePerHour = (meterPerSec) => {
    return (meterPerSec * 2.237).toFixed(2);
  };

  return (
    <div className="weather">
      <div className="top">
        <div>
          {" "}
          <p className="location">{data.city}</p>
          <p className="weather-description">{data.weather[0].main}</p>
        </div>
        <img
          alt="weather"
          className="weather-icon"
          src={`icons/${data.weather[0].icon}.png`}
        />
      </div>
      <div className="bottom">
        <div className="bottom-left">
          <div className="details">
            <span className="details-label">Feels like:</span>
            <span className="details-value">
              {toFahrenheit(data.main.feels_like)}°F
            </span>
          </div>
          <div className="details">
            <span className="details-label">Wind:</span>
            <span className="details-value">
              {toMilePerHour(data.wind.speed)}mi/h
            </span>
          </div>
          <div className="details">
            <span className="details-label">Humidity:</span>
            <span className="details-value">{data.main.humidity}%</span>
          </div>
          <div className="details">
            <span className="details-label">Pressure:</span>
            <span className="details-value"> {data.main.pressure}hPa</span>
          </div>
        </div>
        <p className="temperature">{toFahrenheit(data.main.temp)}°F</p>
      </div>
    </div>
  );
};

export default CurrentWeather;
