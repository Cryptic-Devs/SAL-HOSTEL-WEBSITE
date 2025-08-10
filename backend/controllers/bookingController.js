const Booking = require('../models/Booking');
const Room = require('../models/Room');

exports.createBooking = async (req, res) => {
    try {
        const booking = await Booking.create({
            student: req.user._id,
            room: req.body.room
        });
        res.status(201).json(booking);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.assignBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id).populate('room');
        if (!booking) return res.status(404).json({ message: "Booking not found" });

        const room = await Room.findById(booking.room._id);
        if (room.availableBeds <= 0) {
            return res.status(400).json({ message: "No available beds" });
        }

        booking.status = 'approved';
        room.availableBeds -= 1;

        await booking.save();
        await room.save();

        res.json({ message: "Booking assigned", booking });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
