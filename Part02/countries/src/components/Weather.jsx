import { useState, useEffect } from "react";
import axios from "axios";
const Weather = ({ city }) => {
  // console.log(oneCountry.capital);
  const [weather, setWeather] = useState([]);
  const apiKey = import.meta.env.VITE_API_KEY;
  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      )
      .then((res) => {
        setWeather(res.data);
      });
  }, []);
  return (
    <>
      {weather.main ? (
        <div>
          <h2>Weather in {city} </h2>
          <div>Temperature {weather.main.temp} </div>
          <img
            alt="weather icon"
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          />

          <div>Wind {weather.wind.speed}</div>
        </div>
      ) : null}
    </>
  );
};

export default Weather;
