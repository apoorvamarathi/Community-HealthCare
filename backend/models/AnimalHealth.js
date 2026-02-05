// const mongoose = require("mongoose");

// const animalHealthSchema = new mongoose.Schema({
//   animalType: String, // dog, cat, cow
//   location: String,
//   symptoms: String,
//   vaccinated: Boolean,
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// module.exports = mongoose.model("AnimalHealth", animalHealthSchema);

const mongoose = require("mongoose");

const animalHealthSchema = new mongoose.Schema(
  {
    animalType: {
      type: String,
      required: true,
    },
    ageGroup: {
      type: String,
      required: true,
    },
    healthStatus: {
      type: String,
      required: true,
    },
    symptoms: {
      type: [String],   // ✅ FIX HERE
      default: [],
    },
    notes: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AnimalHealth", animalHealthSchema);
