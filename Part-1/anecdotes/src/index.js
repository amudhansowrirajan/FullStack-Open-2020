/* jshint esversion: 6 */
import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [counter, setCounter] = useState(
    new Array(props.anecdotes.length).fill(0)
  );

  const voteCounter = (counter, selected) => {
    const copy = [...counter];
    copy[selected] += 1;
    setCounter(copy);
  };

  const most = () => {
    let y = 0;
    for (let i = 0; i <= counter.length; i++) {
      if (counter[i] > y) {
        y = counter[i];
      }
    }
    let z = counter.indexOf(y);
    console.log(z);
    return z;
  };

  return (
    <>
      <h4>{props.anecdotes[selected]}</h4>
      <p>This anecdote has {counter[selected]} Votes</p>

      <button
        onClick={() =>
          setSelected(Math.floor(Math.random() * props.anecdotes.length))
        }
      >
        Next
      </button>

      <button onClick={() => voteCounter(counter, selected)}>vote</button>

      <h2>Anecdote with the Most Votes</h2>

      <p>{props.anecdotes[most()]}</p>
      <p>This Anecdote has {counter[most()]} votes</p>
    </>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
