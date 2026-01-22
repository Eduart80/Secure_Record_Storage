const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;
const expiration = '2h';

function authMiddleware(req, res, next) {
  let token = (req.body && req.body.token) || (req.query && req.query.token) || req.headers.authorization;

  if (req.headers.authorization && typeof req.headers.authorization === 'string') {
    const parts = req.headers.authorization.split(' ');
    if (parts.length === 2 && parts[0] === 'Bearer') {
      token = parts[1];
    } else {
      token = req.headers.authorization;
    }
  }

  if (!token || typeof token !== 'string') {
    return res.status(401).json({ message: 'No token provided, authorization denied.' });
  }

  try {
    const { data } = jwt.verify(token, secret, { maxAge: expiration });
    req.user = data;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token, authorization denied.' });
  }
}

module.exports = authMiddleware;