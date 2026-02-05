// const express = require("express");
// const HumanHealth = require("../models/HumanHealth");
// const router = express.Router();

// router.post("/", async (req, res) => {
//   const data = await HumanHealth.create(req.body);
//   res.json(data);
// });

// router.get("/", async (req, res) => {
//   const data = await HumanHealth.find();
//   res.json(data);
// });

// module.exports = router;


const express = require("express");
const HumanHealth = require("../models/HumanHealth");

const router = express.Router();

// CREATE human health data
router.post("/", async (req, res) => {
  try {
    const { ageGroup, healthStatus, symptoms, notes } = req.body;

    if (!ageGroup || !healthStatus) {
      return res.status(400).json({
        success: false,
        message: "ageGroup and healthStatus are required",
      });
    }

    const data = await HumanHealth.create({
      ageGroup,
      healthStatus,
      symptoms: Array.isArray(symptoms) ? symptoms : [],
      notes,
    });

    res.status(201).json({
      success: true,
      message: "Human health data saved successfully",
      data,
    });
  } catch (error) {
    console.error("Human save error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to save human health data",
    });
  }
});

// GET all human health data
router.get("/", async (req, res) => {
  try {
    const data = await HumanHealth.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (error) {
    console.error("Human fetch error:", error);
    res.status(500).json({ message: "Failed to fetch human data" });
  }
});

module.exports = router;
