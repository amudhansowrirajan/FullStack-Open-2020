const blogListRouter = require("express").Router();

const { updateMany } = require("../models/blog");
const Blog = require("../models/blog");

blogListRouter.get("/blogs", async (request, response) => {
  const blogObject = await Blog.find({});
  response.json(blogObject);
});

blogListRouter.post("/blogs", async (request, response) => {
  const blog = new Blog(request.body);

  const result = await blog.save();
  response.json(result);
});

blogListRouter.delete("/blogs/:id", async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

blogListRouter.put("/blogs/:id", async (request, response) => {
  const body = request.body;
  // console.log(body);
  const likesOf = Number(body.likes) + 1;
  const blog = {
    ...body,
    likes: likesOf,
  };
  // console.log(blog);
  const updatedNote = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  });
  // console.log(updatedNote);
  response.json(updatedNote.toJSON());
});

module.exports = blogListRouter;
