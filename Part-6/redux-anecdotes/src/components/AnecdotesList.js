import React from "react";
// import { useDispatch, useSelector } from "react-redux";
import { connect } from "react-redux";

import { voteAnecdoteAction } from "../reducers/anecdoteReducer";
import { notificationMessageAction } from "../reducers/notificationReducer";

const AnecdotesList = (props) => {
  // const dispatch = useDispatch();
  // const filterOf = useSelector((state) => state.filter.content);
  const filterOf = props.filter.content;
  // const anecdotes = useSelector((state) => state.anecdote);
  const anecdotes = props.anecdote;

  const anecdotesFiltered = anecdotes.filter((anec) =>
    anec.content.includes(filterOf)
  );

  const vote = (anecdote) => {
    // dispatch(voteAnecdoteAction(anecdote));
    props.voteAnecdoteAction(anecdote);
    // dispatch(
    //   notificationMessageAction(`you voted for --"${anecdote.content}"`, 3)
    // );
    props.notificationMessageAction(`you voted for --"${anecdote.content}"`, 3);
  };

  const sortedAnecdotes = [...anecdotesFiltered].sort(
    (a, b) => b.votes - a.votes
  );

  return (
    <div>
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
      <br />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    anecdote: state.anecdote,
    filter: state.filter,
  };
};

const mapDispatchToProps = {
  voteAnecdoteAction,
  notificationMessageAction,
};

const ConnectedAnecdotes = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdotesList);
export default ConnectedAnecdotes;
