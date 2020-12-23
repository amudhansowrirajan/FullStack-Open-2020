import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const IndividualBlogs = () => {
  const state = useSelector((state) => state);
  return (
    <div>
      <h2>Blogs</h2>
      <hr />
      {state.blogs.map((blog) => {
        return (
          <div key={blog.id}>
            <h4>
              <Link to={`/blogs/${blog.id}`}>
                {blog.title} BY {blog.author}
              </Link>
            </h4>
            <p>uploaded by {blog.user.name}</p>
            <hr />
          </div>
        );
      })}
    </div>
  );
};

export default IndividualBlogs;
