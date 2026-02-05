const express = require("express");
const HumanHealth = require("../models/HumanHealth");
const AnimalHealth = require("../models/AnimalHealth");
const HealthAnalytics = require("../models/HealthAnalytics");
const router = express.Router();

// Store active clients for real-time updates (if using WebSocket)
const activeClients = new Set();

// Generate comprehensive analytics
router.get("/generate", async (req, res) => {
  try {
    // Get all data from your actual database
    const humanData = await HumanHealth.find();
    const animalData = await AnimalHealth.find();
    
    // Calculate analytics based on real data
    const analytics = calculateAnalytics(humanData, animalData);
    
    // Save analytics to database
    const savedAnalytics = await HealthAnalytics.create(analytics);
    
    res.json({
      success: true,
      message: "Analytics generated successfully",
      data: savedAnalytics
    });
  } catch (error) {
    console.error("Analytics generation error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to generate analytics"
    });
  }
});

// Get latest analytics from database
router.get("/latest", async (req, res) => {
  try {
    const latestAnalytics = await HealthAnalytics.findOne()
      .sort({ generatedAt: -1 });
    
    if (!latestAnalytics) {
      // If no analytics exist, generate new ones
      const humanData = await HumanHealth.find();
      const animalData = await AnimalHealth.find();
      const analytics = calculateAnalytics(humanData, animalData);
      const newAnalytics = await HealthAnalytics.create(analytics);
      
      return res.json({
        success: true,
        data: newAnalytics
      });
    }
    
    res.json({
      success: true,
      data: latestAnalytics
    });
  } catch (error) {
    console.error("Fetch analytics error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch analytics"
    });
  }
});

// Get real-time analytics (always fresh from actual data)
router.get("/realtime", async (req, res) => {
  try {
    // Always get fresh data from database
    const humanData = await HumanHealth.find();
    const animalData = await AnimalHealth.find();
    
    // Calculate analytics with current data
    const analytics = calculateAnalytics(humanData, animalData);
    
    res.json({
      success: true,
      data: analytics
    });
  } catch (error) {
    console.error("Real-time analytics error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to generate real-time analytics"
    });
  }
});

// Get quick stats for dashboard (real data only)
router.get("/quick-stats", async (req, res) => {
  try {
    // Get actual counts from database
    const humanCount = await HumanHealth.countDocuments();
    const animalCount = await AnimalHealth.countDocuments();
    
    // Get today's date
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Get today's submissions
    const humanToday = await HumanHealth.countDocuments({
      createdAt: { $gte: today }
    });
    
    const animalToday = await AnimalHealth.countDocuments({
      createdAt: { $gte: today }
    });
    
    // Get top symptom from actual data
    const allData = [...(await HumanHealth.find()), ...(await AnimalHealth.find())];
    const symptomFrequency = {};
    
    allData.forEach(record => {
      if (record.symptoms && Array.isArray(record.symptoms)) {
        record.symptoms.forEach(symptom => {
          const cleanSymptom = symptom.trim().toLowerCase();
          if (cleanSymptom) {
            symptomFrequency[cleanSymptom] = (symptomFrequency[cleanSymptom] || 0) + 1;
          }
        });
      }
    });
    
    const topSymptomEntry = Object.entries(symptomFrequency)
      .sort((a, b) => b[1] - a[1])[0];
    
    // Get high risk count (poor health status)
    const highRiskHuman = await HumanHealth.countDocuments({ healthStatus: "poor" });
    const highRiskAnimal = await AnimalHealth.countDocuments({ healthStatus: "poor" });
    
    res.json({
      success: true,
      data: {
        totalSubmissions: humanCount + animalCount,
        todaySubmissions: humanToday + animalToday,
        highRisk: highRiskHuman + highRiskAnimal,
        topSymptom: topSymptomEntry ? topSymptomEntry[0].charAt(0).toUpperCase() + topSymptomEntry[0].slice(1) : "None",
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error("Quick stats error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get quick stats"
    });
  }
});

// Get dashboard stats (all real data)
router.get("/dashboard", async (req, res) => {
  try {
    const [
      humanData,
      animalData,
      humanCount,
      animalCount,
      todaySubmissions
    ] = await Promise.all([
      HumanHealth.find(),
      AnimalHealth.find(),
      HumanHealth.countDocuments(),
      AnimalHealth.countDocuments(),
      getTodaySubmissions()
    ]);
    
    // Calculate all analytics with actual data
    const analytics = calculateAnalytics(humanData, animalData);
    
    res.json({
      success: true,
      data: {
        ...analytics,
        totalSubmissions: humanCount + animalCount,
        todaySubmissions: todaySubmissions,
        lastUpdated: new Date()
      }
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard data"
    });
  }
});

// Get today's submissions
async function getTodaySubmissions() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const humanToday = await HumanHealth.countDocuments({
    createdAt: { $gte: today }
  });
  
  const animalToday = await AnimalHealth.countDocuments({
    createdAt: { $gte: today }
  });
  
  return humanToday + animalToday;
}

// Helper function to calculate analytics from REAL data
function calculateAnalytics(humanData, animalData) {
  const totalHuman = humanData.length;
  const totalAnimal = animalData.length;
  const total = totalHuman + totalAnimal;
  
  // Only proceed if we have data
  if (total === 0) {
    return {
      totalHumanSubmissions: 0,
      totalAnimalSubmissions: 0,
      totalSubmissions: 0,
      healthStatusDistribution: { excellent: 0, good: 0, fair: 0, poor: 0 },
      topSymptoms: [],
      ageGroupDistribution: {},
      animalTypeDistribution: {},
      submissionsByDay: [],
      highRiskCount: 0,
      mediumRiskCount: 0,
      lowRiskCount: 0,
      generatedAt: new Date(),
      lastUpdated: new Date()
    };
  }
  
  // Health status distribution (from actual data)
  const healthStatusCount = { excellent: 0, good: 0, fair: 0, poor: 0 };
  
  // Symptom frequency (from actual data)
  const symptomFrequency = {};
  
  // Age group distribution (from actual human data)
  const ageGroupCount = {};
  
  // Animal type distribution (from actual animal data)
  const animalTypeCount = {};
  
  // Process ACTUAL human data
  humanData.forEach(record => {
    // Count health status
    if (record.healthStatus) {
      const status = record.healthStatus.toLowerCase();
      if (healthStatusCount.hasOwnProperty(status)) {
        healthStatusCount[status]++;
      } else {
        // Handle unexpected status
        healthStatusCount.good++; // Default to good
      }
    }
    
    // Count age groups
    if (record.ageGroup) {
      const ageGroup = record.ageGroup;
      ageGroupCount[ageGroup] = (ageGroupCount[ageGroup] || 0) + 1;
    }
    
    // Count symptoms
    if (record.symptoms && Array.isArray(record.symptoms)) {
      record.symptoms.forEach(symptom => {
        const cleanSymptom = symptom.trim().toLowerCase();
        if (cleanSymptom) {
          symptomFrequency[cleanSymptom] = (symptomFrequency[cleanSymptom] || 0) + 1;
        }
      });
    }
  });
  
  // Process ACTUAL animal data
  animalData.forEach(record => {
    // Count health status
    if (record.healthStatus) {
      const status = record.healthStatus.toLowerCase();
      if (healthStatusCount.hasOwnProperty(status)) {
        healthStatusCount[status]++;
      } else {
        healthStatusCount.good++; // Default to good
      }
    }
    
    // Count animal types
    if (record.animalType) {
      const type = record.animalType;
      animalTypeCount[type] = (animalTypeCount[type] || 0) + 1;
    }
    
    // Count symptoms
    if (record.symptoms && Array.isArray(record.symptoms)) {
      record.symptoms.forEach(symptom => {
        const cleanSymptom = symptom.trim().toLowerCase();
        if (cleanSymptom) {
          symptomFrequency[cleanSymptom] = (symptomFrequency[cleanSymptom] || 0) + 1;
        }
      });
    }
  });
  
  // Convert symptom frequency to sorted array (only if we have symptoms)
  const topSymptoms = Object.entries(symptomFrequency)
    .map(([symptom, count]) => ({
      symptom: symptom.charAt(0).toUpperCase() + symptom.slice(1),
      count,
      percentage: Math.round((count / total) * 100)
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
  
  // Calculate risk levels based on actual health status
  let highRisk = 0, mediumRisk = 0, lowRisk = 0;
  
  humanData.forEach(record => {
    if (record.healthStatus && record.healthStatus.toLowerCase() === "poor") {
      highRisk++;
    } else if (record.healthStatus && record.healthStatus.toLowerCase() === "fair") {
      mediumRisk++;
    } else {
      lowRisk++;
    }
  });
  
  animalData.forEach(record => {
    if (record.healthStatus && record.healthStatus.toLowerCase() === "poor") {
      highRisk++;
    } else if (record.healthStatus && record.healthStatus.toLowerCase() === "fair") {
      mediumRisk++;
    } else {
      lowRisk++;
    }
  });
  
  // Get last 7 days of submissions
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date.toISOString().split('T')[0];
  }).reverse();
  
  // Helper function to check if date is same day
  const isSameDay = (date1, date2) => {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  };
  
  const submissionsByDay = last7Days.map(dateStr => {
    const targetDate = new Date(dateStr);
    
    const humanCount = humanData.filter(h => {
      if (!h.createdAt) return false;
      const createdAt = new Date(h.createdAt);
      return isSameDay(createdAt, targetDate);
    }).length;
    
    const animalCount = animalData.filter(a => {
      if (!a.createdAt) return false;
      const createdAt = new Date(a.createdAt);
      return isSameDay(createdAt, targetDate);
    }).length;
    
    const day = targetDate.getDate().toString().padStart(2, '0');
    const month = (targetDate.getMonth() + 1).toString().padStart(2, '0');
    
    return {
      date: `${day}/${month}`,
      humanCount,
      animalCount,
      total: humanCount + animalCount
    };
  });
  
  return {
    totalHumanSubmissions: totalHuman,
    totalAnimalSubmissions: totalAnimal,
    totalSubmissions: total,
    
    healthStatusDistribution: healthStatusCount,
    
    topSymptoms: topSymptoms,
    
    ageGroupDistribution: ageGroupCount,
    
    animalTypeDistribution: animalTypeCount,
    
    submissionsByDay: submissionsByDay,
    
    highRiskCount: highRisk,
    mediumRiskCount: mediumRisk,
    lowRiskCount: lowRisk,
    
    generatedAt: new Date(),
    lastUpdated: new Date()
  };
}

module.exports = router;