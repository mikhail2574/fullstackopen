const Blog = require("../models/blog.js");
const User = require("../models/user");
const middleware = require("../utils/middleware");

const blogsRouter = require("express").Router();

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  res.json(blogs);
});

blogsRouter.post(
  "/",
  middleware.tokenExtractor,
  middleware.userExtractor,
  async (req, res) => {
    const { title, author, url, likes } = req.body;
    const user = req.user;

    if (!title || !url) {
      return res.status(400).json({ error: "title and url are required" });
    }

    const blog = new Blog({
      title,
      author,
      url,
      likes: likes || 0,
      user: user._id,
    });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    const populatedBlog = await savedBlog.populate("user", {
      username: 1,
      name: 1,
    });
    res.status(201).json(populatedBlog);
  }
);

blogsRouter.delete(
  "/:id",
  middleware.tokenExtractor,
  middleware.userExtractor,
  async (req, res) => {
    const user = req.user;
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ error: "blog not found" });
    }

    if (blog.user.toString() !== user._id.toString()) {
      return res
        .status(403)
        .json({ error: "only the creator can delete this blog" });
    }

    await blog.remove();
    res.status(204).end();
  }
);

blogsRouter.put("/:id", async (req, res) => {
  const { title, author, url, likes } = req.body;
  const updated = await Blog.findByIdAndUpdate(
    req.params.id,
    { title, author, url, likes },
    { new: true, runValidators: true, context: "query" }
  ).populate("user", { username: 1, name: 1 });

  if (updated) {
    res.json(updated);
  } else {
    res.status(404).end();
  }
});

module.exports = blogsRouter;
