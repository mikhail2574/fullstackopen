const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const middleware = require("./utils/middleware");
const config = require("./utils/config");
const logger = require("./utils/logger");

const blogsRouter = require("./controllers/blogs.js");
const usersRouter = require("./controllers/users.js");
const loginRouter = require("./controllers/login");

const app = express();

logger.info("connecting to", config.MONGODB_URI);

// Connect to MongoDB
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connection to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.json());
app.use(middleware.tokenExtractor);

app.use(middleware.requestLogger);

// Blogs controller
app.use("/api/blogs", blogsRouter);

// Users controller
app.use("/api/users", usersRouter);

// Login controller
app.use("/api/login", loginRouter);

// Show client-side files
// app.use(express.static("dist"));

// Error handling middleware
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
