import React from "react";
// import { useDispatch } from "react-redux";
import { connect } from "react-redux";

import { createAnecdoteAction } from "../reducers/anecdoteReducer";
import { notificationMessageAction } from "../reducers/notificationReducer";

const AnecdoteForm = (props) => {
  // const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const content = e.target.newAnecdote.value;
    e.target.newAnecdote.value = "";
    // dispatch(createAnecdoteAction(content));
    props.createAnecdoteAction(content);
    // dispatch(notificationMessageAction(`${content} was created`, 3));
    props.notificationMessageAction(`${content} was created`, 3);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          <strong>create new: </strong>
        </label>
        <input name="newAnecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

const mapDispatchToProps = {
  createAnecdoteAction,
  notificationMessageAction,
};

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm);
export default ConnectedAnecdoteForm;
