const Room = require('../models/Room');

// ✅ Get All Rooms
const getRooms = async (req, res) => {
  try {
    const rooms = await Room.findAll();
    return res.status(200).json(rooms);
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// ✅ Get One Room by ID
const getRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const room = await Room.findByPk(id);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    return res.status(200).json(room);
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// ✅ Create Room
const createRoom = async (req, res) => {
  try {
    const { number, capacity, status, pricePerMonth } = req.body;

    if (!number || !capacity || !status || !pricePerMonth) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const room = await Room.create({ number, capacity, status, pricePerMonth });
    return res.status(201).json({ message: 'Room created', room });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// ✅ Update Room
const updateRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const room = await Room.findByPk(id);

    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    const { number, capacity, status, pricePerMonth } = req.body;

    await room.update({
      number: number ?? room.number,
      capacity: capacity ?? room.capacity,
      status: status ?? room.status,
      pricePerMonth: pricePerMonth ?? room.pricePerMonth,
    });

    return res.status(200).json({ message: 'Room updated', room });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// ✅ Delete Room
const deleteRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const room = await Room.findByPk(id);

    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    await room.destroy();
    return res.status(200).json({ message: 'Room deleted' });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { getRooms, getRoom, createRoom, updateRoom, deleteRoom };
