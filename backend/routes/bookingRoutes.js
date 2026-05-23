const express = require('express');
const BookingController = require('../controllers/bookingController');
const { authenticateToken, adminOnly } = require('../middleware/auth');
const router = express.Router();

router.post('/', authenticateToken, BookingController.requestBooking);
router.put('/assign/:id', authenticateToken, adminOnly, BookingController.assignBooking);

module.exports = router;
