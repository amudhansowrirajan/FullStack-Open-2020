import React from "react";
import ReactDOM from "react-dom";

const Header = (props) => {
  return (
    <>
      <h1>{props.title}</h1>
    </>
  );
};

const Part = (props) => {
  return (
    <p>
      {props.part}: {props.exc}
    </p>
  );
};

const Content = (props) => {
  console.log(props);
  return (
    <>
      <Part part={props.parts[0].name} exc={props.parts[0].exercises} />
      <Part part={props.parts[1].name} exc={props.parts[1].exercises} />
      <Part part={props.parts[2].name} exc={props.parts[2].exercises} />
    </>
  );
};

const Total = (props) => {
  return (
    <>
      <p>
        <strong>Number of exercises</strong>: {props.total}{" "}
      </p>{" "}
    </>
  );
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header title={course.name} />
      <Content
        parts={course.parts}
        // part1={part1}
        // // exc1={exercises1}
        // part2={part2}
        // // exc2={exercises2}
        // part3={part3}
        // // exc3={exercises3}
      />

      <Total
        total={
          course.parts[0].exercises +
          course.parts[1].exercises +
          course.parts[2].exercises
        }
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
