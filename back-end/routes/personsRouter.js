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
    res.json(person);
  } catch (err) {
    res.json(null);
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
    res.json([]);
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
  const { name, age, email, gender } = req.body;
  const updateQuery = {};

  if (name !== undefined) {
    if (typeof name !== "string" || !name.trim()) {
      return res
        .status(400)
        .json({ message: "Name must be a non-empty string" });
    }
    if (name.length < 2 || name.length > 50) {
      return res
        .status(400)
        .json({ message: "Name must be between 2 and 50 characters" });
    }
    updateQuery.name = name;
  }
  if (age !== undefined) {
    const ageNum = Number(age);
    if (isNaN(ageNum) || ageNum < 1 || ageNum > 120) {
      return res
        .status(400)
        .json({ message: "Age must be a number between 1 and 120" });
    }
    updateQuery.age = ageNum;
  }
  if (email !== undefined) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res
        .status(400)
        .json({ message: "Email must be a valid email address" });
    }
    updateQuery.email = email;
  }
  if (gender !== undefined) {
    if (!["male", "female"].includes(gender)) {
      return res
        .status(400)
        .json({ message: "Gender must be one of: male, female, other" });
    }
    updateQuery.gender = gender;
  }

  try {
    const { id } = req.params;
    const person = await Person.findByIdAndUpdate(id, updateQuery);
    res.json(person);
  } catch (err) {
    next(err);
  }
}

module.exports = router;
