import React from "react";
// import { useSelector } from "react-redux";
import AnecdotesList from "./components/AnecdotesList";
import AnecdoteForm from "./components/AnecdoteForm";

const App = () => {
  // const anecdotes = useSelector((state) => state);

  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteForm />
      <br />
      <hr />
      <br />
      <AnecdotesList />
    </div>
  );
};

export default App;
