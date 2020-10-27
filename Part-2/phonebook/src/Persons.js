import React from "react";

const Persons = ({ personOf, searchOf, handleDelete }) => {
  return (
    <>
      {personOf
        .filter((person) =>
          person.name.toLowerCase().includes(searchOf.toLowerCase())
        )
        .map((person, index) => (
          <li key={index}>
            {person.name} : {person.number}
            <button onClick={() => handleDelete(person.id, person.name)}>
              Delete
            </button>
          </li>
          // should work with te index since we are not deleting
        ))}
    </>
  );
};

export default Persons;
