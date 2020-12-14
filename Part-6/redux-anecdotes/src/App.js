import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
// import anecdoteServices from "./services/anecdotes";
import { initializeAnecdotes } from "./reducers/anecdoteReducer";
import AnecdotesList from "./components/AnecdotesList";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import Filter from "./components/Filter";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, [dispatch]);

  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteForm />
      <Filter />
      <br />
      <hr />
      <br />
      <AnecdotesList />
      <Notification />
    </div>
  );
};

export default App;
