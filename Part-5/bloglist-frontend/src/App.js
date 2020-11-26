import React, { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import AddBlog from "./components/AddBlog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import _ from "lodash";

const App = () => {
  const [blogs, setBlogs] = useState([]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  // const [title, setTitle] = useState("");
  // const [author, setAuthor] = useState("");
  // const [url, setUrl] = useState("");

  const [showNotice, setShowNotice] = useState(false);
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");

  const addBlogRef = useRef();

  //Description:: gets all te blogs
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);
  // Description:: retrives the token from local storage and set it to user
  useEffect(() => {
    // console.log("usereffect reload");
    const tokenJSON = window.localStorage.getItem("loggedInUser");
    // console.log("parse JSON", JSON.parse(tokenJSON));

    if (tokenJSON) {
      const user = JSON.parse(tokenJSON);
      setUser(user);
      // console.log(user);
      blogService.setToken(user.token);
    } else {
      console.log("useEffect: empty local storage");
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.userLogin({
        username,
        password,
      });

      window.localStorage.setItem("loggedInUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (error) {
      setShowNotice(true);
      setStatus("success");
      setMessage("Invalid Username or Password");

      setTimeout(function () {
        setStatus("");
        setShowNotice(false);
        setMessage("");
      }, 2000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedInUser");
    blogService.setToken(null);
    setUser(null);
    setUsername("");
    setPassword("");
  };

  const likeBlogButton = async (id, blogOf) => {
    const likedBlog = await blogService.updateLikes(id, blogOf);
    console.log(likedBlog);
    setBlogs(
      blogs.map((blog) => (blog.id !== likedBlog.id ? blog : likedBlog))
    );
  };

  const deleteBlogButton = async (id) => {
    const status = await blogService.deleteBlog(id);
    console.log(status);

    if (status === 204) setBlogs(blogs.filter((blog) => blog.id !== id));
  };

  const handleCreateBlog = async (blogObject) => {
    const blogPost = await blogService.createBlog({
      ...blogObject,
      likes: 0,
    });
    console.log(blogPost);
    setBlogs([...blogs, blogPost]);
    setShowNotice(true);
    setStatus("success");
    setMessage(`A new Blog ${blogPost.title} by ${blogPost.author} was added!`);

    //use ref to hide the input field when the post has been completed.
    addBlogRef.current.handleVisibility();

    setTimeout(function () {
      setStatus("");
      setShowNotice(false);
      setMessage("");
    }, 2000);
  };

  const login = () => {
    return (
      <form onSubmit={handleLogin}>
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
        <button id="loginButton" type="submit">
          login
        </button>
      </form>
    );
  };

  return (
    <div>
      {/* {showNotice && <Notification status={status} blogObject={notifyBlog} />} */}
      {showNotice && <Notification message={message} status={status} />}
      <div>
        {!user && login()}
        {user && (
          <div>
            <p>
              {user.name} is logged in.{" "}
              <button id="logoutButton" onClick={handleLogout}>
                logout
              </button>
            </p>
          </div>
        )}
      </div>
      {user && (
        <Togglable name={"Add New Blog"} ref={addBlogRef}>
          <AddBlog submitTo={handleCreateBlog} />
        </Togglable>
      )}
      <div>
        <h2>blogs</h2>
        {_.orderBy(blogs, ["likes"], ["desc"]).map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            likeButton={likeBlogButton}
            deleteButton={deleteBlogButton}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
