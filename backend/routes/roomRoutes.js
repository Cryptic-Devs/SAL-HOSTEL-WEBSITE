const express = require('express');
const { createRoom, getRooms, getRoom, updateRoom, deleteRoom } = require('../controllers/roomController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

// Public: View rooms
router.get('/', getRooms);
router.get('/:id', getRoom);

// Admin: Manage rooms
router.post('/', protect, adminOnly, createRoom);
router.put('/:id', protect, adminOnly, updateRoom);
router.delete('/:id', protect, adminOnly, deleteRoom);

module.exports = router;
