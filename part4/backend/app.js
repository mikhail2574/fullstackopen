const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { countPersons } = require("./mongo.js");
const middleware = require("./utils/middleware");
const config = require("./utils/config");
const logger = require("./utils/logger");

const personsRouter = require("./controllers/persons");

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

app.use(middleware.requestLogger);

// Persons controller
app.use("/api/persons", personsRouter);

// Show client-side files
app.use(express.static("dist"));

// Info endpoint
app.get("/info", async (req, res) => {
  const count = await countPersons();
  res.send(`<p>Phonebook has info for ${count} people</p><p>${new Date()}</p>`);
});

// Error handling middleware
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);
