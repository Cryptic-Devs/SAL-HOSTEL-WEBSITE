require('dotenv').config();
const express = require('express');
const authRoutes = require('./routes/authRoutes');
const roomRoutes = require('./routes/roomRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const { protect, adminOnly } = require('./middleware/authMiddleware');
const sequelize = require('./config/db');

const app = express();

app.use(express.json());

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/bookings', bookingRoutes);

// ✅ Example protected route
app.get('/api/admin/dashboard', protect, adminOnly, (req, res) => {
  res.json({ message: 'Welcome to the Admin Dashboard' });
});

// ✅ Connect DB + Sync Models
sequelize.authenticate()
  .then(() => console.log('✅ MySQL connected...'))
  .catch(err => console.error('❌ DB connection error:', err));

sequelize.sync({ alter: true })
  .then(() => console.log('✅ Models synced'))
  .catch(err => console.error('❌ Sync error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
