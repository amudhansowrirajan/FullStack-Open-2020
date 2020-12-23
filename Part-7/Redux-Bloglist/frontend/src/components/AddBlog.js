import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { createBlogAction } from "../reducers/blogs";

const AddBlog = ({ visibility }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const dispatch = useDispatch();

  return (
    <div>
      <h2>Add a Blog</h2>
      <form
        className="TestAddBlog"
        onSubmit={(e) => {
          e.preventDefault();
          visibility();
          dispatch(createBlogAction({ title, author, url }));
          setTitle("");
          setAuthor("");
          setUrl("");
        }}
      >
        <p>
          <label>Title: </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id="title"
          />
        </p>
        <p>
          <label>Author: </label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            id="author"
            required
          />
        </p>

        <p>
          <label>URL: </label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            id="url"
            required
          />
        </p>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

AddBlog.propTypes = {
  visibility: PropTypes.func.isRequired,
};

export default AddBlog;
