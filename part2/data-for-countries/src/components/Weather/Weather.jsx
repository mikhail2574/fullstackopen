import weatherService from "../../services/weatherService";
import { useEffect, useState } from "react";

const Weather = ({ cityName }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    weatherService.getWeather(cityName).then((response) => {
      setWeather(response.data);
    });
  }, [cityName]);

  return (
    <div>
      <h2>Weather in {cityName}</h2>
      <p>Temperature: {weather?.main?.temp} °C</p>
      <img
        src={
          weather?.weather?.[0]?.icon
            ? `http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`
            : null
        }
        alt="Weather icon"
      />
      <p>Wind: {weather?.wind?.speed} m/s</p>
    </div>
  );
};

export default Weather;
