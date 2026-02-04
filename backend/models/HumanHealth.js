const mongoose = require("mongoose");

const humanHealthSchema = new mongoose.Schema({
  age: Number,
  area: String,
  symptoms: String,
  hospitalAccess: Boolean,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("HumanHealth", humanHealthSchema);
