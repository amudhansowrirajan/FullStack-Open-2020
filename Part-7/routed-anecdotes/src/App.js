import React, { useState } from "react";
import {
  Switch,
  Route,
  Link,
  // useParams,
  useHistory,
  useRouteMatch,
} from "react-router-dom";
import { useField } from "./hooks/index";

const Menu = () => {
  const padding = {
    paddingRight: 5,
  };
  return (
    <div>
      <Link to="/anecdotes/:id"></Link>
      <Link to="/anecdotes" style={padding}>
        Anecdotes
      </Link>
      <Link to="/create" style={padding}>
        Create new
      </Link>
      <Link to="/about" style={padding}>
        About
      </Link>
    </div>
  );
};

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map((anecdote) => (
        <li key={anecdote.id}>
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </li>
      ))}
    </ul>
  </div>
);

const AnecdoteFull = ({ anecdote }) => {
  // const id = useParams().id;
  // console.log(id);

  return (
    <div>
      <h1>
        {anecdote.content} by {anecdote.author}
      </h1>
      <p>has {anecdote.votes} votes</p>
      <p>for more info see {anecdote.info}</p>
    </div>
  );
};

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>
      An anecdote is a brief, revealing account of an individual person or an
      incident. Occasionally humorous, anecdotes differ from jokes because their
      primary purpose is not simply to provoke laughter but to reveal a truth
      more general than the brief tale itself, such as to characterize a person
      by delineating a specific quirk or trait, to communicate an abstract idea
      about a person, place, or thing through the concrete details of a short
      narrative. An anecdote is "a story with a point."
    </em>

    <p>
      Software engineering is full of excellent anecdotes, at this app you can
      find the best and add more.
    </p>
  </div>
);

const Footer = () => (
  <div>
    Anecdote app for{" "}
    <a href="https://courses.helsinki.fi/fi/tkt21009">
      Full Stack -websovelluskehitys
    </a>
    . See{" "}
    <a href="https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js">
      https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js
    </a>{" "}
    for the source code.
  </div>
);

const CreateNew = (props) => {
  // const [content, setContent] = useState("");
  // const [author, setAuthor] = useState("");
  // const [info, setInfo] = useState("");

  const history = useHistory();
  const { clear: clearContent, ...contentCustomHook } = useField("text");
  const { clear: clearAuthor, ...authorCustomHook } = useField("text");
  const { clear: clearInfo, ...infoCustomHook } = useField("text");

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: contentCustomHook.value,
      author: authorCustomHook.value,
      infor: infoCustomHook.value,
      votes: 0,
    });
    history.push("/");
  };

  const clearState = () => {
    clearContent();
    clearAuthor();
    clearInfo();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input
            type={contentCustomHook.type}
            value={contentCustomHook.value}
            onChange={contentCustomHook.onChange}
          />
        </div>
        <div>
          author
          <input {...authorCustomHook} />
        </div>
        <div>
          url for more info
          <input {...infoCustomHook} />
        </div>
        <button type="submit">create</button>
      </form>
      <button onClick={clearState}>reset</button>
    </div>
  );
};

const Notification = ({ notice }) => {
  return notice ? (
    <div>
      <h2>{notice}</h2>
    </div>
  ) : null;
};

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: "1",
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: "2",
    },
  ]);

  const [notification, setNotification] = useState("");
  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  const match = useRouteMatch("/anecdotes/:id");

  // match && console.log("anecdote", anecdoteById(match.params.id));
  const selectedAnecdote = match ? anecdoteById(match.params.id) : null;
  // console.log(selectedAnecdote, match.params.id);

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0);
    setAnecdotes(anecdotes.concat(anecdote));
    setNotification(`A new Anecdote: "${anecdote.content}" was created`);
    setTimeout(() => setNotification(""), 2000);
  };

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Notification notice={notification} />
      <Switch>
        <Route path="/anecdotes/:id">
          <AnecdoteFull anecdote={selectedAnecdote} />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/create">
          <CreateNew addNew={addNew} />
        </Route>
        <Route path="/">
          <AnecdoteList anecdotes={anecdotes} />
        </Route>
      </Switch>

      <hr />
      <Footer />
    </div>
  );
};

export default App;
