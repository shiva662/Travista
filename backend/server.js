// server.js
// Entry point: connect to MongoDB, mount middleware/routes, start server

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const placeRoutes = require('./routes/placeRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const userRoutes = require('./routes/userRoutes');
const savedTripRoutes = require('./routes/savedTripRoutes');
const adminRoutes = require('./routes/adminRoutes'); // New import
const aiRoutes = require('./routes/aiRoutes');

const app = express();
const allowedOrigins = (process.env.CORS_ORIGINS || 'http://localhost:5173')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

// CORS middleware - allow requests from frontend
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// mount routes
app.use('/api/auth', authRoutes);
app.use('/api/places', placeRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/users', userRoutes);
app.use('/api/saved-trips', savedTripRoutes);
app.use('/api/admin', adminRoutes); // Mount admin routes
app.use('/api/ai', aiRoutes);

const PORT = process.env.PORT || 5000;
const MONGO = process.env.MONGO_URI;

mongoose
  .connect(MONGO)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  })
  .catch(err => {
    console.error('DB connection error:', err);
    process.exit(1);
  });