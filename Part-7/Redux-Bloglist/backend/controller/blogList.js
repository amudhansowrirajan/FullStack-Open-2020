const blogListRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/users");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");

blogListRouter.get("/", async (request, response) => {
  const blogObject = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
  });
  response.json(blogObject);
});

blogListRouter.post("/", async (request, response) => {
  const token = request.token;
  const decodedToken = token ? jwt.verify(token, config.SECRET) : null;

  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: "missing or invalid token" });
  }
  // console.log(decodedToken.is, decodedToken.iat, decodedToken.username);
  const user = await User.findById(decodedToken.id);

  const userOf = user.id;

  const blog = new Blog({
    ...request.body,
    likes: 0,
    comments: [],
    user: userOf,
  });
  const result = await blog.save();

  user.blogs = user.blogs.concat(result._id);
  await user.save();

  //////

  response.json(result);
});

blogListRouter.post("/:id/comments", async (request, response) => {
  const body = request.body.comment; // will be comment : comment object

  const id = request.params.id;

  const blog = await Blog.findById(id);

  blog.comments = blog.comments.concat(body);
  const updatedBlog = await blog.save();
  // console.log(updatedBlog);
  // console.log("updatedNote", updatedBlog);
  // response.status(200).json(updatedNote.toJSON());
  response.status(200).json(updatedBlog);
});

blogListRouter.delete("/:id", async (request, response) => {
  const token = request.token;
  const decodedToken = jwt.verify(token, config.SECRET);

  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: "missing or invalid token" });
  }

  console.log("decoded ID", decodedToken.id);

  // confirm is the person owns the blog
  const user = await User.findById(decodedToken.id);
  console.log("before", user.blogs);
  const arrayOfBlogIDS = user.blogs.map((blogid) => blogid.toString());
  if (!arrayOfBlogIDS.includes(request.params.id)) {
    return response
      .status(401)
      .json({ error: "user is not authorised to delete this note" });
  }

  const indexOfBlog = arrayOfBlogIDS.indexOf(request.params.id);
  console.log(indexOfBlog);

  user.blogs.splice(indexOfBlog, 1);
  console.log("after deletion", user.blogs);

  await user.save();
  await Blog.findByIdAndRemove(request.params.id);

  response.status(204).end();
});

blogListRouter.put("/:id", async (request, response) => {
  // anybody can like anything
  const body = request.body;

  // console.log("body", body);
  const likesOf = Number(body.likes) + 1;

  const updatedNote = await Blog.findByIdAndUpdate(
    request.params.id,
    { likes: likesOf },
    {
      new: true,
    }
  );
  console.log("updatedNote", updatedNote);
  response.status(200).json(updatedNote.toJSON());
});

module.exports = blogListRouter;
