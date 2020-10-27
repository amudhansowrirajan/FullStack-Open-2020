//
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

const notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2019-05-30T17:30:31.098Z",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2019-05-30T18:39:34.091Z",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2019-05-30T19:20:14.298Z",
    important: true,
  },
];

ReactDOM.render(<App notes={notes} />, document.getElementById("root"));
// since we are going to be fetching the data from the Server there is no need to pass the props data to the components.

////////
// This is practise for Learning Axios
////////

// const promise = axios.get("http://localhost:3001/notes").then((response) => {
//   const notesServer = response.data;
//   // the variable noteServer is not available outside of the context unless returned to promise
//   console.log(response, "hello", notesServer, response.headers);
//   return notesServer;
// });

/////////
// below is a not-so-suitable method for rendering data from a server request
/////////////
// axios.get("http://localhost:3001/notes").then((response) => {
//   const notes = response.data;
//   ReactDOM.render(<App notes={notes} />, document.getElementById("root"));
// });

// console.log("Promise - single thread", promise);

/////////////////////////////////////////
/////////////////////////////////////////
/////////////////////////////////////////
/////////////////////////////////////////
/////////////////////////////////////////

// const result = notes.map((note) => note.content);
// console.log(result);

// import Note from "./components/Note.js";

// const Note = ({ noteOf }) => {
//   return <li id={noteOf.id}>{noteOf.content}</li>;
// };

// const App = ({ notes }) => {
//   // const { notes } = props;

//   return (
//     <div>
//       <h1>Notes</h1>
//       <ul>
//         {notes.map((note) => (
//           <Note key={note.id} noteOf={note} />
//         ))}
//       </ul>
//     </div>
//   );
// };
