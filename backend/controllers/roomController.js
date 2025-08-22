const { Room } = require('../models');

// GET all rooms
const getRooms = async (req, res) => {
  try {
    const rooms = await Room.findAll();
 Updated upstream
    return res.status(200).json(rooms);
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// GET one room by ID
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

    res.json(rooms);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// GET one room
const getRoom = async (req, res) => {
  try {
    const room = await Room.findByPk(req.params.id);
    if (!room) return res.status(404).json({ message: 'Room not found' });
    res.json(room);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
 Stashed changes
  }
};

// CREATE room
const createRoom = async (req, res) => {
  try {
    const { number, capacity, status, pricePerMonth } = req.body;
 Updated upstream

    // Basic validation
    if (!number || !capacity || !status || !pricePerMonth) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const room = await Room.create({ number, capacity, status, pricePerMonth });
    return res.status(201).json({ message: 'Room created', room });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });

    const room = await Room.create({ number, capacity, status, pricePerMonth });
    res.status(201).json({ message: 'Room created', room });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
 Stashed changes
  }
};

// UPDATE room
const updateRoom = async (req, res) => {
  try {
 Updated upstream
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

    const room = await Room.findByPk(req.params.id);
    if (!room) return res.status(404).json({ message: 'Room not found' });

    const { number, capacity, status, pricePerMonth } = req.body;
    if (number) room.number = number;
    if (capacity) room.capacity = capacity;
    if (status) room.status = status;
    if (pricePerMonth) room.pricePerMonth = pricePerMonth;

    await room.save();
    res.json({ message: 'Room updated', room });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
 Stashed changes
  }
};

// DELETE room
const deleteRoom = async (req, res) => {
  try {
 Updated upstream
    const { id } = req.params;
    const room = await Room.findByPk(id);

    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    await room.destroy();
    return res.status(200).json({ message: 'Room deleted' });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });

    const room = await Room.findByPk(req.params.id);
    if (!room) return res.status(404).json({ message: 'Room not found' });

    await room.destroy();
    res.json({ message: 'Room deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
 Stashed changes
  }
};

module.exports = { getRooms, getRoom, createRoom, updateRoom, deleteRoom };
