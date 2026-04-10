// routes/aiRoutes.js
// Routes for AI-powered trip planning.

const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const aiRateLimit = require('../middleware/aiRateLimit');
const { generateTripPlan, generatePlan } = require('../controllers/aiController');

const router = express.Router();

// Simple public planner endpoint (beginner-friendly flow)
router.post('/plan', aiRateLimit, generatePlan);

// Advanced authenticated planner endpoint
router.post('/plan-trip', authMiddleware, aiRateLimit, generateTripPlan);

module.exports = router;
