const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

let notes = [
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

app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

app.get("/api/notes", (req, res) => {
  res.json(notes);
});

app.get("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  // console.log(id);
  const note = notes.find((x) => {
    return x.id === Number(id);
  });
  // console.log(note);
  note ? res.json(note) : res.status(404).end();
});

app.delete("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  console.log(id);
  notes = notes.filter((note) => note.id !== id);
  console.log(notes);
  // res.status(204).end();
  res.json(notes);
});

const generateID = () => {
  const maxID = notes.length ? Math.max(...notes.map((note) => note.id)) : 0;

  return maxID + 1;
};

app.post("/api/notes", (req, res) => {
  const body = req.body;
  // console.log("headers", req, headers);
  // console.log("note", note);

  if (!body.content) {
    return res.status(400).json({
      error: "Content Missing",
    });
  }

  const note = {
    content: body.content,
    important: body.important || false,
    date: new Date(),
    id: generateID(),
  };

  notes = notes.concat(note);
  console.log(notes);
  res.json(note);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on PORT:${PORT}`);
});
