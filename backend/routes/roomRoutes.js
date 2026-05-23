const express = require('express');
const { createRoom, getRooms, getRoom, updateRoom, deleteRoom } = require('../controllers/roomController');
const { authenticateToken, adminOnly } = require('../middleware/auth');

const router = express.Router();

// Public: View rooms
router.get('/', getRooms);
router.get('/:id', getRoom);

// Admin: Manage rooms
router.post('/', authenticateToken, adminOnly, createRoom);
router.put('/:id', authenticateToken, adminOnly, updateRoom);
router.delete('/:id', authenticateToken, adminOnly, deleteRoom);

module.exports = router;
