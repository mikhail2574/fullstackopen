const express = require("express");
const cors = require("cors");
const {
  getAllPersons,
  getPersonById,
  createPerson,
  deletePerson,
  updatePerson,
  countPersons,
} = require("./mongo.js");

const app = express();
app.use(cors());
app.use(express.json());

// Show client-side files
app.use(express.static("public"));

// Get all persons
app.get("/api/persons", async (req, res) => {
  const persons = await getAllPersons();
  res.json(persons);
});

// Get person by id
app.get("/api/persons/:id", async (req, res, next) => {
  try {
    const person = await getPersonById(req.params.id);
    if (person) {
      res.json(person);
    } else {
      res.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

// Add a new person
app.post("/api/persons", async (req, res, next) => {
  try {
    const person = await createPerson(req.body);
    res.status(201).json(person);
  } catch (error) {
    next(error);
  }
});

// Delete a person
app.delete("/api/persons/:id", async (req, res, next) => {
  try {
    await deletePerson(req.params.id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

// Update a person
app.put("/api/persons/:id", async (req, res, next) => {
  try {
    const updated = await updatePerson(req.params.id, req.body);
    res.json(updated);
  } catch (error) {
    next(error);
  }
});

// Info endpoint
app.get("/info", async (req, res) => {
  const count = await countPersons();
  res.send(`<p>Phonebook has info for ${count} people</p><p>${new Date()}</p>`);
});

// Error handling middleware
app.use((error, req, res, next) => {
  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  }
  if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }
  next(error);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
