import React from "react";
import { Alert } from "@material-ui/lab";

import { useSelector } from "react-redux";

const Notification = (props) => {
  // return props ? <Alert severity="info">{props.message}</Alert> : null;
  const state = useSelector((state) => state);

  return state.notification.show ? (
    <Alert>{state.notification.message}</Alert>
  ) : null;
};

export default Notification;
