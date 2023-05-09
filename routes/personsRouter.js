const express = require("express");
const router = express.Router();
const Person = require("../models/Person");

router.get("/", async function (req, res, next) {
  try {
    const persons = await Person.find();
    res.json(persons);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async function (req, res, next) {
  const { id } = req.params;
  const person = await Person.findById(id);
  res.json(person);
});

router.post("/", async function (req, res, next) {
  const { name, age, email, gender } = req.body;
  if (name && age && email && gender) {
    const person = await Person.create({ name, age, email, gender });
    return res.json(person);
  }
  return res.json({ message: "failed" });
});

router.delete("/:id", async function (req, res, next) {
  const { id } = req.params;
  const person = await Person.findByIdAndDelete(id);
  res.json(person);
});

router.put("/:id", async function (req, res, next) {
  const { id } = req.params;
  const person = await Person.findByIdAndUpdate(id, { ...req.body });
  res.json(person);
});

module.exports = router;
