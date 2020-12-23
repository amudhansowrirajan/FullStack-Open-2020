import React, { useState, useImperativeHandle } from "react";
import PropTypes from "prop-types";

const Togglable = React.forwardRef((props, ref) => {
  const [visibility, setVisibility] = useState(false);

  const toHide = { display: visibility ? "none" : "" };
  const toShow = { display: visibility ? "" : "none" };

  const handleVisibility = () => {
    setVisibility(!visibility);
  };

  useImperativeHandle(ref, () => {
    return { handleVisibility };
  });

  return (
    <div>
      <div style={toHide}>
        <button onClick={handleVisibility}>{props.name}</button>{" "}
      </div>
      <div style={toShow} className="TestTogglable">
        <button onClick={handleVisibility}>{props.name} (hide)</button>
        {props.children}
      </div>
    </div>
  );
});

Togglable.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

Togglable.displayName = "Togglable";

export default Togglable;
