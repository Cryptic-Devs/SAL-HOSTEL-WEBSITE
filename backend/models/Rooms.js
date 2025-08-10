const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    roomNumber: { type: String, required: true, unique: true },
    type: { type: String, required: true }, // e.g., single, double
    capacity: { type: Number, required: true },
    occupied: { type: Number, default: 0 },
    price: { type: Number, required: true },
    status: { type: String, default: 'available' } // available, occupied, maintenance
}, { timestamps: true });

module.exports = mongoose.model('Room', roomSchema);
