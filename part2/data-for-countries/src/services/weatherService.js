import axios from "axios";
const baseUrl = "https://api.openweathermap.org/data/2.5/weather";

const getWeather = (cityName) => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const url = `${baseUrl}?q=${cityName}&appid=${apiKey}&units=metric`;
  return axios.get(url);
};

export default {
  getWeather: getWeather,
};
