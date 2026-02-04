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

router.post("/", async (req, res) => {
  try {
    console.log("Received animal data:", req.body);
    
    // Validate required fields
    if (!req.body.ageGroup || !req.body.healthStatus || !req.body.animalType) {
      return res.status(400).json({ error: "Age group, health status, and animal type are required" });
    }

    const data = await AnimalHealth.create(req.body);
    console.log("Saved to MongoDB:", data);
    res.status(201).json({ 
      success: true, 
      message: "Animal health data saved successfully",
      data: data 
    });
  } catch (error) {
    console.error("Error saving animal data:", error);
    res.status(500).json({ 
      error: "Failed to save animal health data",
      details: error.message 
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await AnimalHealth.find();
    res.json(data);
  } catch (error) {
    console.error("Error fetching animal data:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;