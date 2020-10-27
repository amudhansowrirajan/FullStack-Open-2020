import React, { useState, useEffect } from "react";
import "./index.css";
import Note from "./components/Note";
import noteService from "./services/notes";
import Notification from "./components/Notification";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [status, setstatus] = useState("");

  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
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

  return (
    <div>
      <h1> Notes</h1>
      <Notification message={errorMessage} status={status} />
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
      <form onSubmit={addNote}>
        <input type="text" value={newNote} onChange={handleNoteChange} />
        <button type="submit">Save</button>
      </form>
      <Footer />
    </div>
  );
};

export default App;
