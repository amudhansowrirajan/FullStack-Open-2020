import React, { useState, useEffect } from "react";

import { Button } from "@material-ui/core";

import { useDispatch, useSelector } from "react-redux";
import { loginAction, removeUserAction } from "../reducers/clientLogin";
import { noticeAction } from "../reducers/notification";
import blogService from "../services/blogs";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  useEffect(() => {
    state.client.name &&
      window.localStorage.setItem("loggedInUser", JSON.stringify(state.client));
  }, [state.client]);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      dispatch(loginAction({ username, password }));
      dispatch(noticeAction({ message: `${username} was logged in` }));
      setUsername("");
      setPassword("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedInUser");
    dispatch(removeUserAction());
    blogService.setToken(null);
  };

  return state.client.name ? (
    <div>
      <p>
        {state.client.name} is logged in.
        <Button id="logoutButton" onClick={handleLogout}>
          logout
        </Button>
      </p>
    </div>
  ) : (
    <form onSubmit={(e) => handleLogin(e, username, password)}>
      <h2>Login</h2>
      <p>
        <label>username: </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          id="loginUsername"
        />
      </p>
      <p>
        <label>password: </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="loginPassword"
        />
      </p>
      <Button
        variant="contained"
        color="primary"
        id="loginButton"
        type="submit"
      >
        login
      </Button>
    </form>
  );
};

export default Login;
