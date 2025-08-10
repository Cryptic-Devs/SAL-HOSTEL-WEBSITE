require('dotenv').config();
const express = require('express');
const authRoutes = require('./routes/authRoutes');
const { protect, adminOnly } = require('./middleware/authMiddleware');

const app = express();

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Example: protected route
app.get('/api/admin/dashboard', protect, adminOnly, (req, res) => {
    res.json({ message: 'Welcome to the Admin Dashboard' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
