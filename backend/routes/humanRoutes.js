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

router.post("/", async (req, res) => {
  try {
    console.log("Received human data:", req.body);
    
    // Validate required fields
    if (!req.body.ageGroup || !req.body.healthStatus) {
      return res.status(400).json({ error: "Age group and health status are required" });
    }

    const data = await HumanHealth.create(req.body);
    console.log("Saved to MongoDB:", data);
    res.status(201).json({ 
      success: true, 
      message: "Human health data saved successfully",
      data: data 
    });
  } catch (error) {
    console.error("Error saving human data:", error);
    res.status(500).json({ 
      error: "Failed to save human health data",
      details: error.message 
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await HumanHealth.find();
    res.json(data);
  } catch (error) {
    console.error("Error fetching human data:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;