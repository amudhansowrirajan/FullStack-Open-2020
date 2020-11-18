const app = require("../app");
const supertest = require("supertest");
const helper = require("./blogs");
const api = supertest(app);
const mongoose = require("mongoose");
const Blog = require("../models/blog");
const User = require("../models/users");

/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
beforeEach(async () => {
  await Blog.deleteMany({});

  await User.deleteMany({});
  const user1 = await api.post("/api/users").send(helper.listOfUsers[0]);
  const user2 = await api.post("/api/users").send(helper.listOfUsers[1]);

  const token = await api.post("/api/login").send({
    username: "Mangai",
    password: "passwzxczxcord",
  });
  // console.log("tokrn", token.body.token);
  // console.log("users", user1.body, user2.body);

  for (blog of helper.blogs) {
    const blogOf = await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token.body.token}`)
      .send(blog);

    // console.log(blogOf.body);
  }
}, 100090);
/////////////////////////////////
/////////////////////////////////
/////////////////////////////////

test("GET all - notes are returned as JSON", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-type", /application\/json/);
}, 100000);

test("GET all - all notes (length?) are returned", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body.length).toBe(helper.blogs.length);
}, 100000);

test("a specifc blog has property id", async () => {
  const response = await api
    .get(`/api/blogs`)
    .expect(200)
    .expect("Content-Type", /application\/json/);
  //setup mongooseschema set transform
  expect(response.body[0].id).toBeDefined();
});

test("a valid blog POST can be added", async () => {
  const newBlog = {
    title: "This is a test object",
    author: "Dijkstra can be pronounced",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 1,
  };

  const token = await api.post("/api/login").send({
    username: "Mangai",
    password: "passwzxczxcord",
  });

  const returnedBlog = await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token.body.token}`)
    .send(newBlog)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const response = await api
    .get(`/api/blogs`)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const blogFromServer = response.body.map((blog) => blog.author);

  expect(response.body).toHaveLength(helper.blogs.length + 1);
  expect(returnedBlog.body.title).toBe("This is a test object");
  expect(blogFromServer).toContain("Dijkstra can be pronounced");
});

test("POST without the likes property, should return with  likes=0", async () => {
  const newBlog = {
    title: "This is a test object for likes ",
    author: "Dijkstra can be pronounced",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
  };

  const token = await api.post("/api/login").send({
    username: "Mangai",
    password: "passwzxczxcord",
  });

  const returnedBlog = await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token.body.token}`)
    .send(newBlog)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  expect(returnedBlog.body.likes).toBe(0);
});

test("POST author and url are mandatory for post", async () => {
  const newBlog = {
    author: "Dijkstra can be pronounced",
    likes: 2,
  };

  const token = await api.post("/api/login").send({
    username: "Mangai",
    password: "passwzxczxcord",
  });
  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token.body.token}`)
    .send(newBlog)
    .expect(400);
});

test("POST post without token to received appropriate error response", async () => {
  const newBlog = helper.blogs[3];

  const response = await api.post("/api/blogs").send(newBlog);

  console.log("response, ", response.status, response.body);
  expect(response.body.error).toBe("missing or invalid token");
  expect(response.status).toBe(401);
});

test("DELETE an object from the DB with an ID", async () => {
  const response = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const oneBlogID = response.body[0].id;
  // console.log(oneBlogID);
  const token = await api.post("/api/login").send({
    username: "Mangai",
    password: "passwzxczxcord",
  });

  await api
    .delete(`/api/blogs/${oneBlogID}`)
    .set("Authorization", `Bearer ${token.body.token}`)
    .expect(204);

  const returnedBlog2 = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  expect(returnedBlog2.body).toHaveLength(helper.blogs.length - 1);
}, 99999);

test("PUT increase an object likes by one", async () => {
  const response = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const oldBlog = response.body[0];
  const likesOf = Number(oldBlog.likes) + 1;
  const newBlog = {
    ...oldBlog,
    likes: likesOf,
  };

  const updatedNote = await api
    .put(`/api/blogs/${oldBlog.id}`)
    .send(oldBlog)
    .expect(200);

  expect(updatedNote.body.likes).toBe(likesOf);
  expect(updatedNote.body.title).toEqual(newBlog.title);
}, 999999);
/////////////////////////////////
/////////////////////////////////
/////////////////////////////////

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

/////////////////////////
/////////////////////////
/////////////////////////
/////////////////////////

afterAll(() => {
  mongoose.connection.close();
});

// await api
// .post("/api/blogs")
// .send(blog)
// .set("Content-type", "application/json")
// .set(
//   "Authorization",
//   "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1hZGZzZGFmIiwiaWQiOiI1ZmI1MjhiNTA1OTM2MzQ0NjQ0MzQwODAiLCJpYXQiOjE2MDU3MDc5NjZ9.A7Wd4T5_rqG_E1ce0vIx-1kkE-QrW8q-iKL2Z8fa8uo"
// );
