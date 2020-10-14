import React from "react";
import ReactDOM from "react-dom";

const Hello = (props) => {
  return (
    // This <> </> is an empty fragment and can be used to avoid unnecessary div elements in the finally rendered HTML
    <>
      <p>
        {" "}
        Hello {props.name}, your age is {props.age}{" "}
      </p>
    </>
  );
};

const App = () => {
  console.log("hello from component");

  const now = new Date();
  const a = 10;
  const b = 20;

  /// Only the return expression get returned as a value.

  return (
    <div>
      <p>Hello World, is is now {now.toString()}</p>
      <p>
        {a} multiplied by {b} = {a * b}
      </p>
      <br />
      <h1>Greetings</h1>
      <Hello name="Amudhan" age="45" />
      <Hello name="Mangai" age={45 - 25} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
