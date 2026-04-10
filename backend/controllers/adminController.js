// controllers/adminController.js

const User = require('../models/User');
const Place = require('../models/Place');
const Review = require('../models/Review');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users', error: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const userPlaces = await Place.find({ createdBy: userId }).select('_id');
    const placeIds = userPlaces.map((p) => p._id);

    await Review.deleteMany({ user: userId });
    if (placeIds.length) {
      await Review.deleteMany({ place: { $in: placeIds } });
      await Place.deleteMany({ _id: { $in: placeIds } });
      await User.updateMany({}, { $pull: { savedPlaces: { $in: placeIds } } });
    }

    await User.findByIdAndDelete(userId);

    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user', error: err.message });
  }
};

const getAllPlaces = async (req, res) => {
  try {
    const places = await Place.find().populate('createdBy', 'name email');
    res.json(places);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching places', error: err.message });
  }
};

const deleteAnyPlace = async (req, res) => {
  try {
    const placeId = req.params.id;
    await Place.findByIdAndDelete(placeId);
    await Review.deleteMany({ place: placeId });
    res.json({ message: 'Place and its reviews deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting place', error: err.message });
  }
};

const updateAnyPlace = async (req, res) => {
  try {
    const placeId = req.params.id;
    const updated = await Place.findByIdAndUpdate(placeId, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ message: 'Place not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error updating place', error: err.message });
  }
};

const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate('user', 'name').populate('place', 'title');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching reviews', error: err.message });
  }
};

const deleteAnyReview = async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    // Recalculating averages typically would happen here or via Mongoose hooks
    res.json({ message: 'Review deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting review', error: err.message });
  }
};

const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalPlaces = await Place.countDocuments();
    const totalReviews = await Review.countDocuments();
    
    // Approximate saved places count by aggregating
    const users = await User.find().select('savedPlaces');
    const totalSavedPlaces = users.reduce((acc, current) => acc + current.savedPlaces.length, 0);

    const recentUsers = await User.find().sort({ createdAt: -1 }).limit(5).select('name email createdAt');
    const recentPlaces = await Place.find().sort({ createdAt: -1 }).limit(5).select('title createdAt');

    const topStates = await Place.aggregate([
      { $group: { _id: '$state', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    const ratingBuckets = await Review.aggregate([
      { $group: { _id: '$rating', count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);

    const mostSavedPlaces = await User.aggregate([
      { $unwind: '$savedPlaces' },
      { $group: { _id: '$savedPlaces', saves: { $sum: 1 } } },
      { $sort: { saves: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: 'places',
          localField: '_id',
          foreignField: '_id',
          as: 'place'
        }
      },
      { $unwind: '$place' },
      { $project: { _id: 1, saves: 1, title: '$place.title', state: '$place.state' } }
    ]);

    res.json({
      totals: { totalUsers, totalPlaces, totalReviews, totalSavedPlaces },
      recentActivity: { users: recentUsers, places: recentPlaces },
      insights: {
        topStates: topStates.map((s) => ({ state: s._id, count: s.count })),
        ratingBuckets,
        mostSavedPlaces
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching dashboard stats', error: err.message });
  }
};

module.exports = {
  getAllUsers,
  deleteUser,
  getAllPlaces,
  deleteAnyPlace,
  updateAnyPlace,
  getAllReviews,
  deleteAnyReview,
  getDashboardStats
};
