const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  const xAccessToken = req.headers['x-access-token'];
  const queryToken = req.query && (req.query.token || req.query.access_token);
  const cookieHeader = req.headers.cookie;

  let token = null;
  
  // Authorization header: Bearer <token> OR raw token
  if (authHeader) {
    const parts = String(authHeader).split(' ');
    if (parts.length === 2 && /^Bearer$/i.test(parts[0])) {
      token = parts[1];
    } else {
      token = String(authHeader).trim();
    }
  }

  // x-access-token header
  if (!token && xAccessToken) {
    token = String(xAccessToken).trim();
  }

  // token/access_token in query (useful for tests)
  if (!token && queryToken) {
    token = String(queryToken).trim();
  }

  // token cookie
  if (!token && cookieHeader) {
    const match = cookieHeader.match(/(?:^|; )token=([^;]+)/);
    if (match) {
      token = decodeURIComponent(match[1]);
    }
  }

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