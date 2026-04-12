// controllers/authController.js
// Registration and login business logic

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

function normalizeEmail(value) {
  return String(value || '').trim().toLowerCase();
}

function isBcryptHash(value) {
  return /^\$2[aby]\$\d{2}\$[./A-Za-z0-9]{53}$/.test(String(value || ''));
}

function escapeRegex(value) {
  return String(value || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

async function findUserByEmail(email) {
  const normalized = normalizeEmail(email);
  const direct = await User.findOne({ email: normalized });
  if (direct) {
    return direct;
  }

  // Fallback for legacy rows that may contain accidental surrounding spaces.
  const pattern = new RegExp(`^\\s*${escapeRegex(normalized)}\\s*$`, 'i');
  return User.findOne({ email: pattern });
}

async function verifyPassword(inputPassword, storedPassword) {
  const raw = String(inputPassword || '');
  const stored = String(storedPassword || '');
  const candidates = Array.from(new Set([raw, raw.trim()])).filter(Boolean);
  const hasModernHash = isBcryptHash(stored);

  if (hasModernHash) {
    for (const candidate of candidates) {
      const ok = await bcrypt.compare(candidate, stored);
      if (ok) {
        return { match: true, hasModernHash, passwordUsed: candidate };
      }
    }

    return { match: false, hasModernHash, passwordUsed: raw };
  }

  for (const candidate of candidates) {
    if (candidate === stored) {
      return { match: true, hasModernHash, passwordUsed: candidate };
    }
  }

  return { match: false, hasModernHash, passwordUsed: raw };
}

const registerUser = async (req, res) => {
  try {
    const name = String(req.body?.name || '').trim();
    const email = normalizeEmail(req.body?.email);
    const password = String(req.body?.password || '');

    // basic validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: 'Email already in use' });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashed });
    await user.save();

    // do not send password back
    res.status(201).json({
      message: 'User registered successfully',
      user: { id: user._id, name: user.name, email: user.email, savedPlaces: [] }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const loginUser = async (req, res) => {
  try {
    const email = normalizeEmail(req.body?.email);
    const password = String(req.body?.password || '');
    if (!email || !password) {
      return res.status(400).json({ message: 'Missing credentials' });
    }

    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const hashedPassword = String(user.password || '');
    const { match, hasModernHash, passwordUsed } = await verifyPassword(password, hashedPassword);

    if (!match) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Migrate legacy plain-text passwords to bcrypt after successful login.
    if (!hasModernHash) {
      try {
        user.password = await bcrypt.hash(passwordUsed, 10);
        await user.save();
      } catch (migrationErr) {
        console.error('Password migration error:', migrationErr.message);
      }
    }

    const payload = { id: user._id, email: user.email, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    // populate savedPlaces
    const populated = await User.findById(user._id).select('savedPlaces');
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        savedPlaces: populated.savedPlaces || []
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const resetPassword = async (req, res) => {
  try {
    const email = normalizeEmail(req.body?.email);
    const newPassword = String(req.body?.newPassword || '');

    if (!email || !newPassword) {
      return res.status(400).json({ message: 'Email and new password are required' });
    }

    if (newPassword.trim().length < 6) {
      return res.status(400).json({ message: 'New password must be at least 6 characters' });
    }

    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: 'No account found for this email' });
    }

    user.password = await bcrypt.hash(newPassword.trim(), 10);
    await user.save();

    return res.json({ message: 'Password reset successful. Please log in with your new password.' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { registerUser, loginUser, resetPassword };