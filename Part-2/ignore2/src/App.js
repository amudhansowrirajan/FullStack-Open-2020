import React, { useState, useEffect } from "react";
import "./index.css";
import Note from "./components/Note";
import noteService from "./services/notes";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [status, setstatus] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  // rerender all notes
  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setNotes([...initialNotes]);
    });
  }, []);

  //re- insert the token and setUser
  useEffect(() => {
    const loggedInUser = window.localStorage.getItem("loggedNoteAppUsers");
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      setUser(user);
      noteService.setToken(user.token);
    }
  }, []);

  // console.log("render", notes.length, "notes");

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() >= 0.5,
      // the NoteiD is automatically added in the server side in the JSOn server - the Date and time is also added added this way later on
    };

    console.log(noteObject, "before post");
    noteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote));
      setNewNote("");
      setErrorMessage(`${returnedNote.content} was successfully added`);
      setstatus("success");
      setTimeout(() => {
        setErrorMessage(null);
        setstatus();
      });
    });
  };

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };

  const toggleImportance = (id) => {
    console.log(`importance of ${id} needs to be toggled`);
    // this is not Local - making changes in the sserver - setNotes();
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then((returnedNote) =>
        setNotes(notes.map((note) => (note.id === id ? returnedNote : note)))
      )
      .catch((error) => {
        setErrorMessage(`${note.content} was already removed from the server`);
        setTimeout(() => setErrorMessage(null), 3000);
        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  ///Footer
  const Footer = () => {
    const footerStyle = {
      color: "green",
      fontStyle: "italic",
      fontSize: 16,
    };

    return (
      <div style={footerStyle}>
        <br />
        <em>
          Note-App, Department of Computer Science, University of helsinki 2020
        </em>
      </div>
    );
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setitem("loggedNoteAppUser", JSON.stringify(user));

      setUser(user);
      noteService.setToken(user.token);
      setUsername("");
      setPassword("");
    } catch (error) {
      setErrorMessage("wrong Credentials");
      setstatus("error");
      setTimeout(() => {
        setErrorMessage(null);
        setstatus("");
      }, 2000);
    }
  };

  const noteForm = () => {
    return (
      <form onSubmit={addNote}>
        <input type="text" value={newNote} onChange={handleNoteChange} />
        <button type="submit">Save</button>
      </form>
    );
  };

  return (
    <div>
      <h1> Notes</h1>
      <Notification message={errorMessage} status={status} />

      {user === null ? (
        <LoginForm
          handleSubmit={handleSubmit}
          handleUsernameChange={handleUsernameChange}
          handlePasswordChange={handlePasswordChange}
          username={username}
          password={password}
        />
      ) : (
        <div>
          <p>{user.name} is logged in</p>
          {noteForm()}
        </div>
      )}
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          {showAll ? "Important" : "All"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            noteOf={note}
            toggleImportance={toggleImportance}
          />
        ))}
      </ul>

      <Footer />
    </div>
  );
};

export default App;
