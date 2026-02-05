// const express = require("express");
// const AnimalHealth = require("../models/AnimalHealth");
// const router = express.Router();

// router.post("/", async (req, res) => {
//   const data = await AnimalHealth.create(req.body);
//   res.json(data);
// });

// router.get("/", async (req, res) => {
//   const data = await AnimalHealth.find();
//   res.json(data);
// });

// module.exports = router;


const express = require("express");
const AnimalHealth = require("../models/AnimalHealth");

const router = express.Router();

// CREATE animal health data
router.post("/", async (req, res) => {
  try {
    const { animalType, ageGroup, healthStatus, symptoms, notes } = req.body;

    if (!animalType || !ageGroup || !healthStatus) {
      return res.status(400).json({
        success: false,
        message: "animalType, ageGroup, and healthStatus are required",
      });
    }

    const data = await AnimalHealth.create({
      animalType,
      ageGroup,
      healthStatus,
      symptoms: Array.isArray(symptoms) ? symptoms : [],
      notes,
    });

    res.status(201).json({
      success: true,
      message: "Animal health data saved successfully",
      data,
    });
  } catch (error) {
    console.error("Animal save error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to save animal health data",
    });
  }
});

// GET all animal health data
router.get("/", async (req, res) => {
  try {
    const data = await AnimalHealth.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (error) {
    console.error("Animal fetch error:", error);
    res.status(500).json({ message: "Failed to fetch animal data" });
  }
});

module.exports = router;
