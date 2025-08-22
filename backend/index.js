require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const roomRoutes = require('./routes/roomRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const sequelize = require('./config/db'); // Sequelize connection

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/bookings', bookingRoutes);

// ✅ Test DB connection & sync models
sequelize.authenticate()
  .then(() => console.log("✅ MySQL connected"))
  .catch(err => console.error("❌ DB connection error:", err));

sequelize.sync({ alter: true }) // auto create/update tables
  .then(() => console.log("✅ Models synced"))
  .catch(err => console.error("❌ Sync error:", err));

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
