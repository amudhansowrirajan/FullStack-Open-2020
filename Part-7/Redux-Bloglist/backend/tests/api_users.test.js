const app = require("../app");
const supertest = require("supertest");
const helper = require("./blogs");
const api = supertest(app);
const mongoose = require("mongoose");
const User = require("../models/users");

beforeEach(async () => {
  await User.deleteMany({});
  await api.post("/api/users").send(helper.listOfUsers[0]);
  await api.post("/api/users").send(helper.listOfUsers[1]);
});

test("GET all the the users", async () => {
  const users = await api
    .get("/api/users")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  expect(users.body.length).toBe(helper.listOfUsers.length);
}, 999999);

test("POST post 1 users to the databases", async () => {
  const newuser = {
    username: "thein",
    name: "thein sowrirajan",
    password: "Pasdfgsdfgword",
  };
  await api
    .post("/api/users")
    .send(newuser)
    .expect(200)
    .expect("Content-Type", /application\/json/);
}, 999999);

test("POST post with bad password and username", async () => {
  const badUsername = {
    username: "th",
    name: "thein sowrirajan",
    password: "Pasdfgsdfgword",
  };
  const error1 = await api
    .post("/api/users")
    .send(badUsername)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  const badPassword = {
    username: "theinssdf",
    name: "thein sowrirajan",
    password: "Pa",
  };
  const error2 = await api
    .post("/api/users")
    .send(badPassword)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  expect(error1.body.error).toBe(
    "invalid credentials - username and password must be atleast 3 character long"
  );
  expect(error2.body.error).toBe(
    "invalid credentials - username and password must be atleast 3 character long"
  );
}, 999999);

afterAll(() => {
  mongoose.connection.close();
});
