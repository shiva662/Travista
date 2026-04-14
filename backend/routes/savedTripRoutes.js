const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const {
  saveTrip,
  getSavedTripsByUser,
  deleteSavedTrip,
} = require('../controllers/savedTripController');

const router = express.Router();

router.post('/:tripId', authMiddleware, saveTrip);
router.get('/mine', authMiddleware, getSavedTripsByUser);
router.delete('/:tripId', authMiddleware, deleteSavedTrip);

module.exports = router;
