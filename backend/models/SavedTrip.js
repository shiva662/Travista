const mongoose = require('mongoose');

const savedTripSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    tripId: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

savedTripSchema.index({ userId: 1, tripId: 1 }, { unique: true });

module.exports = mongoose.model('SavedTrip', savedTripSchema);
