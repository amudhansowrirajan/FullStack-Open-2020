import React, { useEffect, useState } from "react";
import axios from "axios";

const Show = ({ country }) => {
  const [weather, setWeather] = useState({});

  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${country.capital}`
      )
      .then((response) => {
        console.log("hello");
        setWeather(response.data.current);
        // console.log(response.data, "weather ", weather);
        console.log(response.data.current);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  console.log(weather);
  return (
    <>
      <h2>{country.name}</h2>
      <p>Capital : {country.capital} </p>
      <p>Population: {country.population}</p>
      <h4>Languages</h4>
      <ul>
        {country.languages.map((language, index) => (
          <li key={index}>{language.name}</li>
        ))}
      </ul>
      <img width="300" height="200" src={country.flag}></img>
      {weather ? (
        <div>
          <h3>Weather in {country.capital}</h3>
          <p>
            <strong>Temperature: </strong>
            {weather.temperature} celcius
          </p>
          {weather.weather_icons ? (
            weather.weather_icons.map((icon, index) => (
              <img key={index} alt="icon" src={icon} width="100" height="100" />
            ))
          ) : (
            <div></div>
          )}
          <p>
            <strong>Wind :</strong>
            {weather.wind_speed} mph and direction {weather.wind_dir}
          </p>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default Show;
