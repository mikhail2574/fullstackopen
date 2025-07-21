const {
  getAllPersons,
  getPersonById,
  createPerson,
  deletePerson,
  updatePerson,
} = require("./mongo.js");

const personsRouter = require("express").Router();

// Get all persons
personsRouter.get("/", async (req, res) => {
  const persons = await getAllPersons();
  res.json(persons);
});

// Get person by id
personsRouter.get("/:id", async (req, res, next) => {
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
personsRouter.post("/", async (req, res, next) => {
  try {
    const person = await createPerson(req.body);
    res.status(201).json(person);
  } catch (error) {
    next(error);
  }
});

// Delete a person
personsRouter.delete("/:id", async (req, res, next) => {
  try {
    await deletePerson(req.params.id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

// Update a person
personsRouter.put("/:id", async (req, res, next) => {
  try {
    const updated = await updatePerson(req.params.id, req.body);
    res.json(updated);
  } catch (error) {
    next(error);
  }
});
