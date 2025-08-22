const Booking = require('../models/Booking');
const Room = require('../models/Room');

// ✅ Create Booking
exports.createBooking = async (req, res) => {
  try {
    const booking = await Booking.create({
      studentId: req.user.id,
      roomId: req.body.roomId,
      checkInDate: req.body.checkInDate,
      checkOutDate: req.body.checkOutDate
    });
    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ✅ Assign Booking (Admin)
exports.assignBooking = async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id, { include: [Room] });
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    const room = booking.Room;
    const availableBeds = room.capacity - room.occupied;

    if (availableBeds <= 0) {
      return res.status(400).json({ message: "No available beds" });
    }

    booking.status = 'approved';
    await booking.save();

    await room.update({ occupied: room.occupied + 1 });

    res.json({ message: "Booking assigned", booking });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
