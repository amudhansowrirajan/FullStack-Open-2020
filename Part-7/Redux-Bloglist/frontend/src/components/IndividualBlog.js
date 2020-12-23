import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import { likeBlogAction, commentBlogAction } from "../reducers/blogs";

const IndividualBlog = () => {
  const [comment, setComment] = useState("");

  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const match = useRouteMatch("/blogs/:id");
  const blog = match
    ? state.blogs.find((blog) => blog.id === match.params.id)
    : null;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(comment);
    dispatch(commentBlogAction(blog, comment));
    setComment("");
  };

  return blog ? (
    <div>
      <h2>
        {blog.title} by {blog.author}
      </h2>
      URL: <a href={blog.url}>{blog.url}</a>
      <p>
        {blog.likes} Likes{" "}
        <button onClick={() => dispatch(likeBlogAction(blog))}>Like</button>
      </p>
      <p>added by: {blog.user.name}</p>
      <h4>Comments</h4>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />
        <button type="submit">Add comment</button>
      </form>
      <ul>
        {blog.comments.map((comment, i) => {
          return <li key={i}>{comment}</li>;
        })}
      </ul>
    </div>
  ) : null;
};

export default IndividualBlog;
