import React, { useState } from "react";
import PropTypes from "prop-types";

const Blog = (props) => {
  const [showFull, setShowFull] = useState(false);

  const handleShowFullBlog = () => {
    setShowFull(!showFull);
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
          <button onClick={() => props.likeButton(props.blog.id, props.blog)}>
            Like
          </button>
        </p>
        <p>{props.blog.url}</p>
        <button
          onClick={() => {
            props.deleteButton(props.blog.id);
          }}
        >
          delete blog (above)
        </button>
      </div>
    );
  };

  return (
    <>
      <button onClick={handleShowFullBlog}>View</button>
      {showFull ? fullBlog() : blurb()}
    </>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  likeButton: PropTypes.func.isRequired,
  deleteButton: PropTypes.func.isRequired,
};
export default Blog;
