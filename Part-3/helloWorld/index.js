require("dotenv").config();
const express = require("express");

const cors = require("cors");
const Note = require("./models/note");
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
  Note.find({}).then((notes) => {
    res.json(notes);
  });
});

app.get("/api/notes/:id", (req, res, next) => {
  const id = req.params.id;

  Note.findById(id)
    .then((note) => {
      if (note) {
        response.json(note);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => {
      console.log(error);
      // response.status(400).send({ error: `malformatted ID` });
      next(error);
    });
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

app.post("/api/notes", (req, res, next) => {
  const body = req.body;
  // console.log("headers", req, headers);
  // console.log("note", note);

  if (!body.content) {
    return res.status(400).json({
      error: "Content Missing",
    });
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
    // id: generateID(),
  });

  note
    .save()
    .then((savedNote) => {
      res.json(savedNote);
    })
    .catch((error) => next(error));
});

const errorHandler = (error, request, response, next) => {
  console.log(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformed id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on PORT:${PORT}`);
});
