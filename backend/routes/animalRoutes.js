
// const express = require("express");
// const AnimalHealth = require("../models/AnimalHealth");

// const router = express.Router();

// // CREATE animal health data
// router.post("/", async (req, res) => {
//   try {
//     const { animalType, ageGroup, healthStatus, symptoms, notes } = req.body;

//     if (!animalType || !ageGroup || !healthStatus) {
//       return res.status(400).json({
//         success: false,
//         message: "animalType, ageGroup, and healthStatus are required",
//       });
//     }

//     const data = await AnimalHealth.create({
//       animalType,
//       ageGroup,
//       healthStatus,
//       symptoms: Array.isArray(symptoms) ? symptoms : [],
//       notes,
//     });

//     res.status(201).json({
//       success: true,
//       message: "Animal health data saved successfully",
//       data,
//     });
//   } catch (error) {
//     console.error("Animal save error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to save animal health data",
//     });
//   }
// });

// // GET all animal health data
// router.get("/", async (req, res) => {
//   try {
//     const data = await AnimalHealth.find().sort({ createdAt: -1 });
//     res.json(data);
//   } catch (error) {
//     console.error("Animal fetch error:", error);
//     res.status(500).json({ message: "Failed to fetch animal data" });
//   }
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

// GET single animal health data by ID
router.get("/:id", async (req, res) => {
  try {
    const data = await AnimalHealth.findById(req.params.id);
    
    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Animal health data not found",
      });
    }
    
    res.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Animal fetch by ID error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch animal health data",
    });
  }
});

// UPDATE animal health data by ID
router.put("/:id", async (req, res) => {
  try {
    const { animalType, ageGroup, healthStatus, symptoms, notes } = req.body;

    const updateData = {
      animalType,
      ageGroup,
      healthStatus,
      symptoms: Array.isArray(symptoms) ? symptoms : [],
      notes,
    };

    const data = await AnimalHealth.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Animal health data not found",
      });
    }

    res.json({
      success: true,
      message: "Animal health data updated successfully",
      data,
    });
  } catch (error) {
    console.error("Animal update error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update animal health data",
    });
  }
});

// DELETE animal health data by ID
router.delete("/:id", async (req, res) => {
  try {
    const data = await AnimalHealth.findByIdAndDelete(req.params.id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Animal health data not found",
      });
    }

    res.json({
      success: true,
      message: "Animal health data deleted successfully",
      data,
    });
  } catch (error) {
    console.error("Animal delete error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete animal health data",
    });
  }
});

module.exports = router;