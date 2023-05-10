const express = require("express");
const router = express.Router();
const Person = require("../models/Person");

router.get("/", getAllPersons);
router.get("/:id", getPersonById);
router.post("/", createPerson);
router.delete("/:id", deletePersonById);
router.put("/:id", updatePersonById);

async function getAllPersons(req, res, next) {
  try {
    const persons = await Person.find();
    res.json(persons);
  } catch (err) {
    next(err);
  }
}

async function getPersonById(req, res, next) {
  try {
    const { id } = req.params;
    const person = await Person.findById(id);
    res.json([person]);
  } catch (err) {
    next(err);
  }
}

async function createPerson(req, res, next) {
  try {
    const { name, age, email, gender } = req.body;
    if (!name || !age || !email || !gender) {
      return res.json({ message: "failed" });
    }
    const person = await Person.create({ name, age, email, gender });
    res.json(person);
  } catch (err) {
    next(err);
  }
}

async function deletePersonById(req, res, next) {
  try {
    const { id } = req.params;
    const person = await Person.findByIdAndDelete(id);
    res.json(person);
  } catch (err) {
    next(err);
  }
}

async function updatePersonById(req, res, next) {
  try {
    const { id } = req.params;
    const person = await Person.findByIdAndUpdate(id, { ...req.body });
    res.json(person);
  } catch (err) {
    next(err);
  }
}

module.exports = router;
