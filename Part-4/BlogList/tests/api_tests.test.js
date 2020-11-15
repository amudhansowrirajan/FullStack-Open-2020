const app = require("../app");

const supertest = require("supertest");
const helper = require("./blogs");
const api = supertest(app);
const mongoose = require("mongoose");
const Blog = require("../models/blog");

/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
beforeEach(async () => {
  await Blog.deleteMany({});
  const blogObject = helper.blogs.map((blog) => new Blog(blog));
  const promiseArray = blogObject.map((blog) => blog.save());
  await Promise.all(promiseArray);
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

  expect(response.body).toHaveLength(helper.blogs.length);
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

  const returnedBlog = await api
    .post("/api/blogs")
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

  const returnedBlog = await api
    .post("/api/blogs")
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

  await api.post("/api/blogs").send(newBlog).expect(400);
});

test("DELETE an object from the DB with an ID", async () => {
  const response = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const oneBlogID = response.body[0].id;
  // console.log(oneBlogID);
  await api.delete(`/api/blogs/${oneBlogID}`).expect(204);
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
  expect(updatedNote.body).toEqual(newBlog);
}, 999999);
/////////////////////////////////
/////////////////////////////////
/////////////////////////////////

afterAll(() => {
  mongoose.connection.close();
});
