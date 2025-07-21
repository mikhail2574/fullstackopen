const bcrypt = require("bcrypt");
const User = require("../models/user");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const { test } = require("node:test");
const { expect } = require("node:test");

beforeEach(async () => {
  await User.deleteMany({});
  const passwordHash = await bcrypt.hash("sekret", 10);
  const user = new User({ username: "root", passwordHash });
  await user.save();
});

test("creation fails with short password", async () => {
  const newUser = {
    username: "baduser",
    name: "Invalid",
    password: "12",
  };

  const result = await api.post("/api/users").send(newUser).expect(400);

  expect(result.body.error).toContain("Password must be at least");
});
