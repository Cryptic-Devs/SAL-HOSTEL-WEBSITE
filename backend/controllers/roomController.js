const Room = require('../models/Room');

// ✅ Create Room
exports.createRoom = async (req, res) => {
  try {
    const room = await Room.create(req.body);
    res.status(201).json(room);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ✅ Get All Rooms
exports.getRooms = async (req, res) => {
  try {
    const rooms = await Room.findAll();
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Update Room
exports.updateRoom = async (req, res) => {
  try {
    const [updated] = await Room.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ message: "Room not found" });

    const updatedRoom = await Room.findByPk(req.params.id);
    res.json(updatedRoom);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ✅ Delete Room
exports.deleteRoom = async (req, res) => {
  try {
    const deleted = await Room.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: "Room not found" });

    res.json({ message: "Room deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
