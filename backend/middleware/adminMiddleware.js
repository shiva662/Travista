// middleware/adminMiddleware.js
// Protects admin routes by verifying the user role

const adminMiddleware = (req, res, next) => {
  // req.user is set by authMiddleware
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admin resources only.' });
  }
  next();
};

module.exports = adminMiddleware;
