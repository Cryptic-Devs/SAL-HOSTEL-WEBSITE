const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Room = sequelize.define('Room', {
  roomNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false, // e.g., single, double, suite
  },
  capacity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  occupied: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('available', 'occupied', 'maintenance'),
    defaultValue: 'available',
  },
}, {
  timestamps: true,
  tableName: 'rooms',
});

module.exports = Room;
