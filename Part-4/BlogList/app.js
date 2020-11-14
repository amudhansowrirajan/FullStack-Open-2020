require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const blogListRouter = require("./controller/blogList");
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("connected to database");
  })
  .catch((error) => {
    console.log(error);
  });

app.use(cors());
app.use(express.json());
app.use("/api", blogListRouter);

module.exports = app;
