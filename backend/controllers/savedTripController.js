const mongoose = require('mongoose');
const SavedTrip = require('../models/SavedTrip');

function normalizeTripId(value) {
  return String(value || '').trim();
}

function isAuthErrorMessage(message) {
  const text = String(message || '').toLowerCase();
  return text.includes('invalid or expired token') || text.includes('no token provided');
}

const saveTrip = async (req, res) => {
  try {
    const userId = req.user && req.user.id;
    const tripId = normalizeTripId(req.params.tripId || req.body.tripId);

    if (!userId || !mongoose.isValidObjectId(userId)) {
      return res.status(401).json({ success: false, message: 'Authentication required' });
    }

    if (!tripId) {
      return res.status(400).json({ success: false, message: 'tripId is required' });
    }

    if (tripId.length > 64) {
      return res.status(400).json({ success: false, message: 'tripId is invalid' });
    }

    const existing = await SavedTrip.findOne({ userId, tripId }).lean();
    if (existing) {
      return res.status(409).json({ success: false, message: 'Trip already saved' });
    }

    const savedTrip = await SavedTrip.create({ userId, tripId });

    return res.status(201).json({
      success: true,
      message: 'Trip saved successfully',
      savedTrip: {
        _id: savedTrip._id,
        userId: savedTrip.userId,
        tripId: savedTrip.tripId,
        timestamp: savedTrip.createdAt,
      },
    });
  } catch (err) {
    if (err && err.code === 11000) {
      return res.status(409).json({ success: false, message: 'Trip already saved' });
    }

    if (isAuthErrorMessage(err?.message)) {
      return res.status(403).json({ success: false, message: 'Invalid or expired token' });
    }

    console.error('saveTrip error:', err);
    return res.status(500).json({ success: false, message: 'Failed to save trip' });
  }
};

const getSavedTripsByUser = async (req, res) => {
  try {
    const userId = req.user && req.user.id;

    if (!userId || !mongoose.isValidObjectId(userId)) {
      return res.status(401).json({ success: false, message: 'Authentication required' });
    }

    const savedTrips = await SavedTrip.find({ userId }).sort({ createdAt: -1 }).lean();

    return res.json({
      success: true,
      savedTrips: savedTrips.map((item) => ({
        _id: item._id,
        userId: item.userId,
        tripId: item.tripId,
        timestamp: item.createdAt,
      })),
    });
  } catch (err) {
    if (isAuthErrorMessage(err?.message)) {
      return res.status(403).json({ success: false, message: 'Invalid or expired token' });
    }

    console.error('getSavedTripsByUser error:', err);
    return res.status(500).json({ success: false, message: 'Failed to fetch saved trips' });
  }
};

const deleteSavedTrip = async (req, res) => {
  try {
    const userId = req.user && req.user.id;
    const tripId = normalizeTripId(req.params.tripId || req.body.tripId);

    if (!userId || !mongoose.isValidObjectId(userId)) {
      return res.status(401).json({ success: false, message: 'Authentication required' });
    }

    if (!tripId) {
      return res.status(400).json({ success: false, message: 'tripId is required' });
    }

    const deleted = await SavedTrip.findOneAndDelete({ userId, tripId });
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Saved trip not found' });
    }

    return res.json({ success: true, message: 'Saved trip removed' });
  } catch (err) {
    if (isAuthErrorMessage(err?.message)) {
      return res.status(403).json({ success: false, message: 'Invalid or expired token' });
    }

    console.error('deleteSavedTrip error:', err);
    return res.status(500).json({ success: false, message: 'Failed to remove saved trip' });
  }
};

module.exports = {
  saveTrip,
  getSavedTripsByUser,
  deleteSavedTrip,
};
