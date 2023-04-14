import Search from "./components/search/Search";
import CurrentWeather from "./components/current-weahter/CurrentWeather";
import Forecast from "./components/forecast/Forecast";
import { OPEN_WEATHER_API_URL, OPEN_WEATHER_API_KEY } from "./api";
import "./App.css";
import { useState } from "react";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastWeather, setForecastWeather] = useState(null);

  const handleOnSearchChange = (searchData) => {
    fetch(
      `${OPEN_WEATHER_API_URL}/weather?lat=${searchData.value.lat}&lon=${searchData.value.lon}&appid=${OPEN_WEATHER_API_KEY}`
    )
      .then((response) => response.json())
      .then((response) =>
        setCurrentWeather({
          city: `${searchData.label}`,
          main: response.main,
          weather: response.weather,
          wind: response.wind,
        })
      )
      .catch((error) => console.log(error));

    fetch(
      `${OPEN_WEATHER_API_URL}/forecast?lat=${searchData.value.lat}&lon=${searchData.value.lon}&appid=${OPEN_WEATHER_API_KEY}`
    )
      .then((response) => response.json())
      .then((response) => {
        setForecastWeather(response.list.slice(0, 5));
      });
  };

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecastWeather && <Forecast data={forecastWeather} />}
    </div>
  );
}

export default App;
