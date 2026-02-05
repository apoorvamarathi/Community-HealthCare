const mongoose = require("mongoose");

const healthAnalyticsSchema = new mongoose.Schema({
  // Human Analytics
  totalHumanSubmissions: Number,
  totalAnimalSubmissions: Number,
  averageHumanAge: Number,
  averageAnimalAge: Number,
  
  // Health Status Distribution
  healthStatusDistribution: {
    excellent: Number,
    good: Number,
    fair: Number,
    poor: Number
  },
  
  // Symptom Analytics
  topSymptoms: [{
    symptom: String,
    count: Number,
    percentage: Number
  }],
  
  // Age Group Analytics
  ageGroupDistribution: {
    "Under 18": Number,
    "18-30": Number,
    "31-45": Number,
    "46-60": Number,
    "Over 60": Number
  },
  
  // Animal Type Analytics
  animalTypeDistribution: {
    Dog: Number,
    Cat: Number,
    Cow: Number,
    Bird: Number,
    Other: Number
  },
  
  // Time-based Analytics
  submissionsByDay: [{
    date: String,
    humanCount: Number,
    animalCount: Number
  }],
  
  // Risk Analysis
  highRiskCount: Number,
  mediumRiskCount: Number,
  lowRiskCount: Number,
  
  // Generated timestamp
  generatedAt: {
    type: Date,
    default: Date.now
  },
  
  // Analytics metadata
  dataRange: {
    startDate: Date,
    endDate: Date,
    totalDays: Number
  }
});

module.exports = mongoose.model("HealthAnalytics", healthAnalyticsSchema);