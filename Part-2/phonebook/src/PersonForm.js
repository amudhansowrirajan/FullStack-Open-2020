import React from "react";

const PersonForm = ({
  onSubmitOf,
  valueOfNewName,
  onChangeOfNewName,
  valueOfNewNumber,
  onChangeOfNewNumber,
}) => {
  return (
    <form onSubmit={onSubmitOf}>
      <div>
        <label>Name - </label>
        <input
          value={valueOfNewName}
          onChange={(event) => onChangeOfNewName(event.target.value)}
        />
        <br />
        <label>Number - </label>
        <input
          value={valueOfNewNumber}
          onChange={(event) => onChangeOfNewNumber(event.target.value)}
        />
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  );
};

export default PersonForm;
