import React from "react";
// import { useDispatch } from "react-redux";
import { connect } from "react-redux";

import { filterAction } from "../reducers/filterReducer";

const Filter = (props) => {
  // const dispatch = useDispatch();
  const handleChange = (event) => {
    // dispatch(filterAction(event.target.value));
    props.filterAction(event.target.value);
  };
  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      <strong>filter: </strong> <input onChange={handleChange} />
    </div>
  );
};

const mapDispatchToProps = {
  filterAction,
};

const ConnectedFilter = connect(null, mapDispatchToProps)(Filter);
export default ConnectedFilter;
