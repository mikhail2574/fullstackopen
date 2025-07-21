const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minLength: 3,
  },
  number: {
    minLength: 8,
    validate: {
      validator: (v) => /\d{2,3}-\d+/.test(v),
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Person", personSchema);
