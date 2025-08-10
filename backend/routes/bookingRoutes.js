const express = require('express');
const { createBooking, assignBooking } = require('../controllers/bookingController');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, createBooking);
router.put('/assign/:id', protect, adminOnly, assignBooking);

module.exports = router;
