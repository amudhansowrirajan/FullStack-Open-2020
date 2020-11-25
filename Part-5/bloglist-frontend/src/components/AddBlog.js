import React, { useState } from "react";
import PropTypes from "prop-types";

const AddBlog = (props) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  return (
    <div>
      <h2>Add a Blog</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          props.submitTo({ title, author, url });
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
            required
          />
        </p>
        <p>
          <label>Author: </label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </p>

        <p>
          <label>URL: </label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </p>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

AddBlog.propTypes = {
  submitTo: PropTypes.func.isRequired,
};

export default AddBlog;
