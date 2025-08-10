// routes/index.js
const express = require('express');
const router = express.Router();


// Import controllers
const AuthController = require('../controllers/authController');
const BookingController = require('../controllers/bookingController');

// Import middleware
const { authenticateToken, studentOnly } = require('../middleware/auth');

// =====================
// Authentication Routes
// =====================

// POST /api/register - Register new user (student, admin, staff)
router.post('/register', AuthController.register);

// POST /api/login - Login user
router.post('/login', AuthController.login);

// GET /api/profile - Get user profile (protected route)
router.get('/profile', authenticateToken, AuthController.getProfile);

// =====================
// Booking Routes
// =====================

// POST /api/bookings/request - Submit booking request (students only)
router.post('/bookings/request', 
  authenticateToken, 
  studentOnly,
  BookingController.upload.single('admission_letter'),
  BookingController.requestBooking
);

// GET /api/bookings/my-bookings - Get user's bookings (students only)
router.get('/bookings/my-bookings', 
  authenticateToken, 
  studentOnly, 
  BookingController.getUserBookings
);

// GET /api/bookings/available-rooms - Get available rooms (students only)
router.get('/bookings/available-rooms', 
  authenticateToken, 
  studentOnly, 
  BookingController.getAvailableRooms
);

// =====================
// Test Routes
// =====================

// GET /api/test - Test route to verify API is working
router.get('/test', (req, res) => {
  res.json({
    success: true,
    message: 'Hostel Management API is working!',
    timestamp: new Date().toISOString()
  });
});

// GET /api/protected-test - Test protected route
router.get('/protected-test', authenticateToken, (req, res) => {
  res.json({
    success: true,
    message: 'Protected route access successful!',
    user: req.user
  });
});

module.exports = router;