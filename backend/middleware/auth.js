const jwt = require('jsonwebtoken');

/**
 * Authentication middleware for UnityEats
 * Expects token in Authorization header as: Bearer <token>
 * This matches the frontend implementation in src/lib/api.ts
 */
module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  
  if (!authHeader) {
    return res.status(401).json({ message: 'No authorization header provided' });
  }

  // Extract Bearer token from Authorization header
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ message: 'Invalid authorization format. Expected: Bearer <token>' });
  }

  const token = parts[1];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};