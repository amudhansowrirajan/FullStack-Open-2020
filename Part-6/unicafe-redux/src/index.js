import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { counterReducer, initialState } from "./reducer";

const store = createStore(counterReducer);

const App = () => {
  const good = () => {
    store.dispatch({
      type: "GOOD",
    });
  };

  const neutral = () => {
    store.dispatch({
      type: "OK",
    });
  };

  const bad = () => {
    store.dispatch({
      type: "BAD",
    });
  };

  const reset = () => {
    store.dispatch({
      type: "ZERO",
    });
  };

  const totalVotes =
    store.getState().good + store.getState().ok + store.getState().bad;

  const average =
    (store.getState().good - store.getState().bad) / totalVotes || 0;

  const positive = (store.getState().good / totalVotes) * 100 || 0;

  const report = () => {
    return (
      <div>
        <div>good : {store.getState().good}</div>
        <div>neutral: {store.getState().ok}</div>
        <div>bad: {store.getState().bad}</div>
        <br />
        <div>All: {totalVotes}</div>
        <div>Average: {average}</div>
        <div>Statistics: {positive}%</div>
      </div>
    );
  };

  return (
    <div>
      <h1>Unicafe - Feedback</h1>
      <button onClick={good}>good</button>
      <button onClick={neutral}>neutral</button>
      <button onClick={bad}>bad</button>
      <br />
      <br />
      <button onClick={reset}>reset stats</button>
      <br />
      <br />
      {store.getState() === initialState ? (
        <h4>No feedback given</h4>
      ) : (
        report()
      )}
    </div>
  );
};

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById("root"));
};

renderApp();
store.subscribe(renderApp);
