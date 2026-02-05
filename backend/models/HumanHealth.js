// const mongoose = require("mongoose");

// const humanHealthSchema = new mongoose.Schema({
//   age: Number,
//   area: String,
//   symptoms: String,
//   hospitalAccess: Boolean,
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// module.exports = mongoose.model("HumanHealth", humanHealthSchema);


const mongoose = require("mongoose");

const humanHealthSchema = new mongoose.Schema(
  {
    ageGroup: {
      type: String,
      required: true,
      trim: true,
    },
    healthStatus: {
      type: String,
      required: true,
    },
    symptoms: {
      type: [String],   // ✅ FIX
      default: [],
    },
    notes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,   // createdAt, updatedAt
  }
);

module.exports = mongoose.model("HumanHealth", humanHealthSchema);
