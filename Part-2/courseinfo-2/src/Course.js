import React from "react";

const Header = ({ name }) => {
  return <h3>{name}</h3>;
};

const Total = ({ course }) => {
  const sum = course
    .map((x) => x.exercises)
    .reduce((prev, cur) => cur + prev, 0);
  return (
    <p>
      <strong>Number of exercises</strong> : {sum}
    </p>
  );
};

const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} : {exercises}
    </p>
  );
};

const Content = ({ course }) => {
  return (
    <>
      <ul>
        {course.map((part) => (
          <Part key={part.id} name={part.name} exercises={part.exercises} />
        ))}
      </ul>
    </>
  );
};

const Course = ({ courses }) => {
  const test = "sdfkg";

  return (
    <>
      {courses.map((course) => {
        return (
          <div key={course.id}>
            <Header name={course.name} />
            <Content course={course.parts} />
            <Total course={course.parts} />
            <hr></hr>
          </div>
        );
      })}
    </>
  );
};

export default Course;
