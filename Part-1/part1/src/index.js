import React, { useState } from "react";
import ReactDOM from "react-dom";

const History = (props) => {
  if (props.allClicks.length === 0) {
    return <div>the app is used by pressing the buttons</div>;
  }

  return <div>button press history: {props.allClicks.join(" ")}</div>;
};

const Button = ({ handleClick, text }) => (
  <>
    <button onClick={handleClick}>{text}</button>
  </>
);

const App = () => {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [allClicks, setAll] = useState([]);

  const handleLeftClick = () => {
    setAll(allClicks.concat("L"));
    setLeft(left + 1);
  };

  // we use concat because it is a pure function

  const handleRightClick = () => {
    setAll(allClicks.concat("R"));
    setRight(right + 1);
  };

  const hello = (who) => () => {
    console.log("hello", who);
  };

  const Bbutton = (props) => {
    return <button onClick={props.handleClick}>{props.text}</button>;
  };

  return (
    <div>
      {left}
      <Button handleClick={() => handleLeftClick()} text="plus" />
      <Button handleClick={() => handleRightClick()} text="minus" />
      {right}
      <History allClicks={allClicks} />
      <Button handleClick={hello("Whaaaaaa")} text="Hello" />
      <Button handleClick={hello("React")} text="Hello" />
      <Button handleClick={hello("Function ")} text="Hello" />
      <Bbutton handleClick={hello("fly baby fly")} text="nope" />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////

// const Display = ({ counter }) => (
//   <div>
//     <h1>{counter}</h1>
//   </div>
// );

// const Button = ({ handleClick, text }) => (
//   <>
//     <button onClick={handleClick}>{text}</button>
//   </>
// );

// const App = () => {
//   const [counter, setCounter] = useState(0);
//   // setTimeout(() => setCounter(counter + 1), 1000);

//   const increaseCounter = () => {
//     setCounter(counter + 1);
//   };

//   const decreaseCounter = () => {
//     setCounter(counter - 1);
//   };
//   const setToZero = () => {
//     setCounter(0);
//   };

//   return (
//     <>
//       <Display counter={counter} />
//       <Button handleClick={increaseCounter} text="Plus" />
//       <Button handleClick={decreaseCounter} text="Minus" />

//       <br />
//       <p />
//       <Button handleClick={setToZero} text="ZeroIt" />
//     </>
//   );
// };

// // we would have to call this all the time. Everytime there was a need for a state change.
// const refresh = function () {
//   ReactDOM.render(<App counter={counter} />, document.getElementById("root"));
// };

// setInterval(() => {
//   refresh();
//   counter++;
// }, 1000);
