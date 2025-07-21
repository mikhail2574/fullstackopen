const test = require("node:test");
const { expect } = require("node:test");
const Blog = require("../models/blog");
const app = require("../app"); // Express app
const supertest = require("supertest");
const api = supertest(app);
const User = require("../models/user");
const bcrypt = require("bcrypt");

let token;

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  const passwordHash = await bcrypt.hash("sekret", 10);
  const user = new User({ username: "root", passwordHash });
  await user.save();

  const loginRes = await api
    .post("/api/login")
    .send({ username: "root", password: "sekret" });

  token = loginRes.body.token;
});

test("creating a blog requires a token", async () => {
  const newBlog = {
    title: "Protected Blog",
    author: "Root",
    url: "http://test.com",
    likes: 4,
  };

  await api.post("/api/blogs").send(newBlog).expect(401);
});

test("a valid blog can be added with token", async () => {
  const newBlog = {
    title: "Blog with Token",
    author: "Root",
    url: "http://withtoken.com",
    likes: 5,
  };

  const response = await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  expect(response.body.title).toBe("Blog with Token");
});
