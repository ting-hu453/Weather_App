import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "./forecast.css";

const WEEK_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const Forecast = ({ data }) => {
  const currentDayInWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(
    currentDayInWeek,
    WEEK_DAYS.length
  ).concat(WEEK_DAYS.slice(0, currentDayInWeek));

  const toFahrenheit = (kelvin) => {
    return Math.ceil(((+kelvin - 273.15) * 9) / 5 + 32);
  };

  const toMilePerHour = (meterPerSec) => {
    return (meterPerSec * 2.237).toFixed(2);
  };

  console.log("data", data);
  return (
    <div>
      <h2 className="title">Forecast</h2>
      <Accordion allowZeroExpanded>
        {data.map((item, index) => (
          <AccordionItem key={index}>
            <AccordionItemHeading>
              <AccordionItemButton>
                <div className="daily-item-button">
                  <img
                    alt="weather"
                    className="daily-icon-weather"
                    src={`icons/${item.weather[0].icon}.png`}
                  />
                  <label className="day">{forecastDays[index]}</label>
                  <label className="description">
                    {item.weather[0].description}
                  </label>
                  <label className="temp-range">
                    {toFahrenheit(item.main.temp_min)}°F --{" "}
                    {toFahrenheit(item.main.temp_max)}°F
                  </label>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <div className="daily-item-panel">
                <div className="daily-item-panel-details">
                  <span className="daily-item-panel-details-label">
                    Feels like:
                  </span>
                  <span className="daily-item-panel-details-value">
                    {toFahrenheit(item.main.feels_like)}°F
                  </span>
                </div>

                <div className="daily-item-panel-details">
                  <span className="daily-item-panel-details-label">Wind:</span>
                  <span className="daily-item-panel-details-value">
                    {toMilePerHour(item.wind.speed)}mi/h
                  </span>
                </div>

                <div className="daily-item-panel-details">
                  <span className="daily-item-panel-details-label">
                    Humidity:
                  </span>
                  <span className="daily-item-panel-details-value">
                    {item.main.humidity}%
                  </span>
                </div>

                <div className="daily-item-panel-details">
                  <span className="daily-item-panel-details-label">
                    Pressure:
                  </span>
                  <span className="daily-item-panel-details-value">
                    {item.main.pressure}hPa
                  </span>
                </div>
              </div>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default Forecast;
