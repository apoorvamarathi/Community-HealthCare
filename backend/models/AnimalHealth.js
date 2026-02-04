const mongoose = require("mongoose");

const animalHealthSchema = new mongoose.Schema({
  animalType: String, // dog, cat, cow
  location: String,
  symptoms: String,
  vaccinated: Boolean,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("AnimalHealth", animalHealthSchema);
