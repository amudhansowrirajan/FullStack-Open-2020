require("dotenv").config();
const express = require("express");
const app = express();
require("express-async-errors");
const cors = require("cors");

const blogListRouter = require("./controller/blogList");
const usersRouter = require("./controller/users");
const loginRouter = require("./controller/login");
const mongoose = require("mongoose");
const middleware = require("./utils/middleware");

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
app.use(express.static("build"));
app.use(middleware.getToken);
app.use("/api/blogs", blogListRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

if (process.env.NODE_ENV === "test") {
  const testRouter = require("./controller/testing");
  app.use("/api/testing", testRouter);
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
