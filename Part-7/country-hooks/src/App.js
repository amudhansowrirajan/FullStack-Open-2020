import axios from "axios";
import React, { useState, useEffect } from "react";
// import axios from "axios";

const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

const useCountry = (name) => {
  const [country, setCountry] = useState(null);
  // if (name) return;
  // setCountry(name);
  useEffect(() => {
    // console.log("hello from useCountry");
    // console.log("heelo there");

    axios
      .get(`https://restcountries.eu/rest/v2/name/${name}?fullText=true`)
      .then((response) => {
        // console.log(response.data[0]);
        // console.log(response.data[0]);

        setCountry(response.data[0]);
      })
      .catch((err) => {
        // console.log(err);
        setCountry(null);
      });
  }, [name]);
  // console.log(country);
  return country;
};

const Country = ({ country }) => {
  console.log("1");
  if (!country) {
    return <p>Please enter a country name</p>;
  }
  // the JSON response has a different format
  // if (!country.found) {
  //   return <div>not found...</div>;
  // }

  return (
    <div>
      <h3>{country.name} </h3>
      <div>Capital: {country.capital} </div>
      <div>Population: {country.population}</div>
      <img src={country.flag} height="100" alt={`flag of ${country.name}`} />
    </div>
  );
};

const App = () => {
  const nameInput = useField("text");
  const [name, setName] = useState("");
  const country = useCountry(name);

  const fetch = (e) => {
    e.preventDefault();
    setName(nameInput.value);
    // console.log(country);
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  );
};

export default App;
