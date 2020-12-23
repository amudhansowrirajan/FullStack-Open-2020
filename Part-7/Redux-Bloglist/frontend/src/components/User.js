import React from "react";
import { useRouteMatch } from "react-router-dom";
import { useSelector } from "react-redux";

const User = () => {
  const state = useSelector((state) => state);
  const match = useRouteMatch("/users/:id");
  const user = match
    ? state.users.find((user) => user.id === match.params.id)
    : null;

  return user ? (
    <div>
      <h3>{user.name.toUpperCase()}</h3>
      <h3>Blogs</h3>
      <ul>
        {user.blogs.map((blog) => {
          return <li key={blog.id}>{blog.title}</li>;
        })}
      </ul>
    </div>
  ) : null;
};

export default User;
