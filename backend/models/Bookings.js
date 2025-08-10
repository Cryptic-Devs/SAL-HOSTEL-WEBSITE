const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },
    status: { type: String, default: 'booked' } // booked, checked-in, checked-out
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
