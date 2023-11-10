const mongoose = require("mongoose");

const ideaSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, "Please add a text"],
  },

  tag: {
    type: String,
  },
  username: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Idea", ideaSchema);
