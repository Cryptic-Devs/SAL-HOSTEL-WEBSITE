const Room = require('../models/Room');

exports.createRoom = async (req, res) => {
    try {
        const room = await Room.create(req.body);
        res.status(201).json(room);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getRooms = async (req, res) => {
    const rooms = await Room.find();
    res.json(rooms);
};

exports.updateRoom = async (req, res) => {
    try {
        const room = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(room);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteRoom = async (req, res) => {
    await Room.findByIdAndDelete(req.params.id);
    res.json({ message: "Room deleted" });
};
