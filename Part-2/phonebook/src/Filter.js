import React from "react";

const Filter = ({ valueOf, onChangeOf }) => {
  return (
    <div>
      <label>Filter by : </label>
      <input
        value={valueOf}
        onChange={(event) => onChangeOf(event.target.value)}
      />
    </div>
  );
};

export default Filter;
