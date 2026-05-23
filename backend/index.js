require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const roomRoutes = require('./routes/roomRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const apiRoutes = require('./routes/index');
const sequelize = require('./config/db'); // Sequelize connection

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api', apiRoutes);

app.get('/', (req, res) => res.send('Backend is running!'));

// Load Sequelize models so sync can register them
require('./models/Room');
require('./models/User');
require('./models/Bookings');

const PORT = process.env.PORT || 5000;

// ✅ Test DB connection & sync models before starting the server
sequelize.authenticate()
  .then(() => console.log('✅ MySQL connected'))
  .then(() => sequelize.sync({ alter: true }))
  .then(() => console.log('✅ Models synced'))
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ DB startup error:', err);
    process.exit(1);
  });
