// const mongoose = require("mongoose");

// if (process.argv.length < 3) {
//   console.log(
//     `please provide the password as an arguement node mogo.js <password>`
//   );
//   process.exit(1);
// }

// const password = process.argv[2];

// const url = `mongodb+srv://amudhan123:${password}@phonebook.x01qw.mongodb.net/note-app?retryWrites=true&w=majority`;

// mongoose.connect(url, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
//   useCreateIndex: true,
// });

// const noteSchema = new mongoose.Schema({
//   content: String,
//   date: Date,
//   important: Boolean,
// });

// const Note = mongoose.model("Note", noteSchema);
// // mongoose takes te plural version on the singular model name in string - "Note" version

// const note = new Note({
//   content: "frontend back-end database",
//   date: new Date(),
//   important: false,
// });

// Note.find({ important: true }).then((result) => {
//   result.forEach((note) => {
//     console.log(note);
//   });
//   mongoose.connection.close();
// });

// // note.save().then((result) => {
// //   console.log("note saved");
// //   console.log(result);
// //   mongoose.connection.close();
// // });
