import React from "react";

const Note = ({ noteOf, toggleImportance }) => {
  const label = noteOf.important ? "make not important" : "make important";
  return (
    <li className="note">
      {noteOf.content}
      <button onClick={() => toggleImportance(noteOf.id)}>{label}</button>
    </li>
  );
};

export default Note;
