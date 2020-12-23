const usersRouter = require("express").Router();
const User = require("../models/users");
const bcrypt = require("bcrypt");

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    url: 1,
    title: 1,
    author: 1,
  });
  // console.log("users:", users);
  response.json(users);
});

usersRouter.post("/", async (request, response) => {
  const body = request.body;

  if (body.password.length < 3 || body.username.length < 3) {
    return response.status(400).json({
      error:
        "invalid credentials - username and password must be atleast 3 character long",
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash: passwordHash,
  });
  // console.log(user);
  const savedUser = await user.save();
  // console.log(savedUser);
  response.json(savedUser);
});

module.exports = usersRouter;
