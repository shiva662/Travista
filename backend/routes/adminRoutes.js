// routes/adminRoutes.js

const express = require('express');
const router = express.Router();

const {
  getAllUsers,
  deleteUser,
  getAllPlaces,
  deleteAnyPlace,
  updateAnyPlace,
  getAllReviews,
  deleteAnyReview,
  getDashboardStats
} = require('../controllers/adminController');

const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

// Protect all admin routes
router.use(authMiddleware);
router.use(adminMiddleware);

router.get('/dashboard', getDashboardStats);

router.route('/users')
  .get(getAllUsers);

router.route('/users/:id')
  .delete(deleteUser);

router.route('/places')
  .get(getAllPlaces);

router.route('/places/:id')
  .put(updateAnyPlace)
  .delete(deleteAnyPlace);

router.route('/reviews')
  .get(getAllReviews);

router.route('/reviews/:id')
  .delete(deleteAnyReview);

module.exports = router;
