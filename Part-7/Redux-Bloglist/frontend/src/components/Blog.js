import React, { useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { likeBlogAction, deleteBlogAction } from "../reducers/blogs";

const Blog = (props) => {
  const [showFull, setShowFull] = useState(false);

  const dispatch = useDispatch();

  const handleShowFullBlog = () => {
    setShowFull(!showFull);
  };

  const likeBlogButton = async (blogOf) => {
    dispatch(likeBlogAction(blogOf));
  };

  const deleteBlogButton = async (id) => {
    dispatch(deleteBlogAction(id));
  };

  const blurb = () => {
    return (
      <div className="TestBlogBlurb">
        <p>
          <em>Title:</em>
          {props.blog.title}
          <em> Author:</em> {props.blog.author}
        </p>
      </div>
    );
  };

  const fullBlog = () => {
    return (
      <div className="TestBlogFullBlog">
        <p>
          <em>Title: </em>
          {props.blog.title}
        </p>
        <p>
          <em>Author: </em> {props.blog.author}
        </p>
        <p>
          Likes: {props.blog.likes}{" "}
          <button
            className="TestLikeButton"
            onClick={() => likeBlogButton(props.blog)}
          >
            Like
          </button>
        </p>
        <p>URL: {props.blog.url}</p>
        <button
          onClick={() => {
            deleteBlogButton(props.blog.id);
          }}
        >
          delete blog (above)
        </button>
      </div>
    );
  };

  return (
    <>
      <button className="showFullBlog" onClick={handleShowFullBlog}>
        View
      </button>
      {showFull ? fullBlog() : blurb()}
    </>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default Blog;
