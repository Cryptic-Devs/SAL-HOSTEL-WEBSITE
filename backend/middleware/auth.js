// middleware/auth.js
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access token is required'
    });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({
          success: false,
          message: 'Token has expired'
        });
      } else if (err.name === 'JsonWebTokenError') {
        return res.status(403).json({
          success: false,
          message: 'Invalid token'
        });
      } else {
        return res.status(403).json({
          success: false,
          message: 'Token verification failed'
        });
      }
    }

    req.user = user;
    next();
  });
};

// Middleware to check user roles
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    if (!roles.includes(req.user.user_type)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Insufficient permissions.'
      });
    }

    next();
  };
};

// Middleware specifically for student-only routes
const studentOnly = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required'
    });
  }

  if (req.user.user_type !== 'student') {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Students only.'
    });
  }

  next();
};

// Middleware for admin-only routes
const adminOnly = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required'
    });
  }

  if (req.user.user_type !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Administrators only.'
    });
  }

  next();
};

// Middleware for staff and admin routes
const staffOrAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required'
    });
  }

  if (!['staff', 'admin'].includes(req.user.user_type)) {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Staff or Administrator access required.'
    });
  }

  next();
};

module.exports = {
  authenticateToken,
  authorizeRoles,
  studentOnly,
  adminOnly,
  staffOrAdmin
};