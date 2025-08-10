const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getRooms, getRoom, createRoom, updateRoom, deleteRoom } = require('../controllers/roomController');

// Public: View rooms
router.get('/', getRooms);
router.get('/:id', getRoom);

// Admin: Manage rooms
router.post('/', auth, createRoom);
router.put('/:id', auth, updateRoom);
router.delete('/:id', auth, deleteRoom);

module.exports = router;
