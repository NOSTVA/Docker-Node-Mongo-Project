const mongoose = require("mongoose");

const structure = {
  name: {
    type: String,
    required: [true, "name is required"],
    minlength: 1,
  },
  age: {
    type: Number,
    required: [true, "age is required"],
  },
  gender: {
    type: String,
    required: [true, "gender is required"],
    enum: ["male", "female"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Invalid email",
    ],
    unique: true,
    lowercase: true,
  },
};

const options = {
  timestamps: true,
};

const PersonSchema = new mongoose.Schema(structure, options);
module.exports = mongoose.model("Person", PersonSchema);
