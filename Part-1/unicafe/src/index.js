/*jshint esversion: 6 */
import React, { useState } from "react";

import ReactDOM from "react-dom";

const Button = (props) => {
  let newStat = props.stat + 1;

  return (
    <button onClick={() => props.handleClick(newStat)}>{props.text}</button>
  );
};

const Statistic = ({ text, value }) => (
  <tr>
    <td>
      <strong>{text}</strong>
    </td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ good, bad, neutral }) => {
  let all = good + bad + neutral;
  let average = (good - bad) / all;
  let positive = good / all;

  if (!all) {
    return <h4>No feedBack Given</h4>;
  } else {
    return (
      <table>
        {/* <thead></thead> */}
        <tbody>
          <Statistic text="Good" value={good} />
          <Statistic text="Bad" value={bad} />
          <Statistic text="Neutral" value={neutral} />
          <Statistic text="All " value={all} />
          <Statistic text="Average" value={average} />
          <Statistic text="Positive" value={positive} />
        </tbody>
      </table>
    );
  }
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  // const all = function () {
  //   return good + neutral + bad;
  // };
  // const average = function () {
  //   if (!all()) {
  //     return 0;
  //   }
  //   return (good - bad) / all();
  // };

  // const postive = function () {
  //   if (!all()) {
  //     return 0;
  //   }
  //   return good / all() + "%";
  // };

  return (
    <div>
      <h1> Unicafe</h1>
      <Button stat={good} handleClick={setGood} text="good" />
      <Button stat={neutral} handleClick={setNeutral} text="neutral" />
      <Button stat={bad} handleClick={setBad} text="Bad" />
      <br />
      <h1>Statistics</h1>
      <Statistics text="Good" good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
