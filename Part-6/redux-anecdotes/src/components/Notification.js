import React from "react";
import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification.content);
  const visibility = useSelector((state) => state.notification.visibility);
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };
  return visibility ? (
    <div style={style}>
      {notification}
      <br />
    </div>
  ) : null;
};

export default Notification;
