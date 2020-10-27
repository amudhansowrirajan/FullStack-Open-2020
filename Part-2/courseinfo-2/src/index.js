import React from "react";
import ReactDOM from "react-dom";
import Course from "./Course";

const App = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  return (
    <>
      <h1>Web Development Curriculum</h1>
      <hr></hr>
      <Course courses={courses} />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

/////////////////////////////
///////////////////////////////
///////////////////////////////
///////////////////////////////

// const Header = ({ name }) => {
//   return <h3>{name}</h3>;
// };

// const Total = ({ course }) => {
//   const sum = course
//     .map((x) => x.exercises)
//     .reduce((prev, cur) => cur + prev, 0);
//   return (
//     <p>
//       <strong>Number of exercises</strong> : {sum}
//     </p>
//   );
// };

// const Part = ({ name, exercises }) => {
//   return (
//     <p>
//       {name} : {exercises}
//     </p>
//   );
// };

// const Content = ({ course }) => {
//   return (
//     <>
//       <ul>
//         {course.map((part) => (
//           <Part key={part.id} name={part.name} exercises={part.exercises} />
//         ))}
//       </ul>
//     </>
//   );
// };

// {
//   /*  */
// }
// const Course = ({ courses }) => {
//   const test = "sdfkg";

//   return (
//     <>
//       {courses.map((course) => {
//         return (
//           <div key={course.id}>
//             <Header name={course.name} />
//             <Content course={course.parts} />
//             <Total course={course.parts} />
//             <hr></hr>
//           </div>
//         );
//       })}
//     </>
//   );
// };
