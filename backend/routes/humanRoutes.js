
// const express = require("express");
// const HumanHealth = require("../models/HumanHealth");

// const router = express.Router();

// // CREATE human health data
// router.post("/", async (req, res) => {
//   try {
//     const { ageGroup, healthStatus, symptoms, notes } = req.body;

//     if (!ageGroup || !healthStatus) {
//       return res.status(400).json({
//         success: false,
//         message: "ageGroup and healthStatus are required",
//       });
//     }

//     const data = await HumanHealth.create({
//       ageGroup,
//       healthStatus,
//       symptoms: Array.isArray(symptoms) ? symptoms : [],
//       notes,
//     });

//     res.status(201).json({
//       success: true,
//       message: "Human health data saved successfully",
//       data,
//     });
//   } catch (error) {
//     console.error("Human save error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to save human health data",
//     });
//   }
// });

// // GET all human health data
// router.get("/", async (req, res) => {
//   try {
//     const data = await HumanHealth.find().sort({ createdAt: -1 });
//     res.json(data);
//   } catch (error) {
//     console.error("Human fetch error:", error);
//     res.status(500).json({ message: "Failed to fetch human data" });
//   }
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

// GET single human health data by ID
router.get("/:id", async (req, res) => {
  try {
    const data = await HumanHealth.findById(req.params.id);
    
    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Human health data not found",
      });
    }
    
    res.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Human fetch by ID error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch human health data",
    });
  }
});

// UPDATE human health data by ID
router.put("/:id", async (req, res) => {
  try {
    const { ageGroup, healthStatus, symptoms, notes } = req.body;

    const updateData = {
      ageGroup,
      healthStatus,
      symptoms: Array.isArray(symptoms) ? symptoms : [],
      notes,
    };

    const data = await HumanHealth.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Human health data not found",
      });
    }

    res.json({
      success: true,
      message: "Human health data updated successfully",
      data,
    });
  } catch (error) {
    console.error("Human update error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update human health data",
    });
  }
});

// DELETE human health data by ID
router.delete("/:id", async (req, res) => {
  try {
    const data = await HumanHealth.findByIdAndDelete(req.params.id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Human health data not found",
      });
    }

    res.json({
      success: true,
      message: "Human health data deleted successfully",
      data,
    });
  } catch (error) {
    console.error("Human delete error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete human health data",
    });
  }
});

module.exports = router;