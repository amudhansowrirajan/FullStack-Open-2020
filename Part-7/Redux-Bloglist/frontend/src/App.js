import React, { useEffect, useRef } from "react";
import { Switch, Link, Route } from "react-router-dom";

import {
  Container,
  AppBar,
  Toolbar,
  IconButton,
  Button,
} from "@material-ui/core";

import Blog from "./components/Blog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import AddBlog from "./components/AddBlog";
import Login from "./components/Login";
import Footer from "./components/Footer";
import Users from "./components/Users";
import User from "./components/User";
import IndividualBlogs from "./components/IndividualBlogs";
import IndividualBlog from "./components/IndividualBlog";

import _ from "lodash";

import { useDispatch, useSelector } from "react-redux";
import { initializeBlogsAction } from "./reducers/blogs";
import { initializeUsersAction } from "./reducers/users";

import { setUserAction } from "./reducers/clientLogin";

const App = () => {
  //  Todo:: The notification component is currently inactive. We need to link the notifiction component ot the state for the message and use action to alter the state of the notification etc
  const dispatch = useDispatch();
  const addBlogRef = useRef();

  const state = useSelector((state) => state);
  const userName = state.client.name;

  // Description:: Download the blogs
  useEffect(() => {
    dispatch(initializeBlogsAction());
    dispatch(initializeUsersAction());
  }, [dispatch]);

  // Description:: login check
  useEffect(() => {
    const tokenJSON = window.localStorage.getItem("loggedInUser");

    if (tokenJSON) {
      const client = JSON.parse(tokenJSON);
      dispatch(setUserAction(client));
    } else {
      console.log("useEffect: empty local storage");
    }
  }, [dispatch]);

  const toggleCreateBlogVisibility = () => {
    addBlogRef.current.handleVisibility();
  };

  const style = {
    color: "white",
    textDecoration: "none",
  };

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton edge="start" color="inherit" aria-label="menu" /> */}

          <Button variant="outlined" color="primary">
            <Link style={style} to="/">
              <p style={style}>Home</p>
            </Link>
          </Button>
          <Button color="primary">
            <Link style={style} to="/users">
              <p style={style}>Users</p>
            </Link>
          </Button>
          <Button color="primary">
            <Link style={style} to="/blogs">
              <p style={style}>Blogs</p>
            </Link>
          </Button>
        </Toolbar>
      </AppBar>

      <Notification />
      <br />
      <Login />

      <Switch>
        <Route path="/users/:id">
          <User />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/blogs/:id">
          <IndividualBlog />
        </Route>
        <Route path="/blogs">
          <IndividualBlogs />
        </Route>
        <Route path="/">
          {userName && (
            <Togglable name={"Add New Blog"} ref={addBlogRef}>
              <AddBlog visibility={toggleCreateBlogVisibility} />
            </Togglable>
          )}
          <h2>Blogs</h2>
          {_.orderBy(state.blogs, ["likes"], ["desc"]).map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </Route>
      </Switch>

      <Footer />
    </Container>
  );
};

export default App;
