const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');
const Room = require('./Room');

const Booking = sequelize.define('Booking', {
  checkInDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  checkOutDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('booked', 'approved', 'checked-in', 'checked-out'),
    defaultValue: 'booked'
  }
}, {
  timestamps: true,
  tableName: 'bookings'
});

// ✅ Associations
User.hasMany(Booking, { foreignKey: 'studentId' });
Booking.belongsTo(User, { foreignKey: 'studentId' });

Room.hasMany(Booking, { foreignKey: 'roomId' });
Booking.belongsTo(Room, { foreignKey: 'roomId' });

module.exports = Booking;
