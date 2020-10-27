import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Show from "./Show";

const App = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setData([...response.data]);
    });
  }, []);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleClick = (name) => {
    setSearch(name);
  };

  const dataMap = data.filter((country) =>
    country.name.toLowerCase().trim().includes(search.toLowerCase())
  );

  return (
    <div>
      <h4>Find Countries</h4>
      <input value={search} onChange={handleSearch} />
      <hr />

      <div>
        {dataMap.length > 10 ? (
          <p> Too many matches, specify another filter</p>
        ) : dataMap.length === 1 ? (
          <Show country={dataMap[0]} />
        ) : (
          dataMap.map((country) => {
            return (
              <div key={country.name}>
                <p>{country.name}</p>
                <button onClick={() => handleClick(country.name)}>Show</button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

// {data.map((country, index) => (
//   <p key={index}>{country.name}</p>
// ))}
