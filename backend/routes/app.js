const userRoutes = require('./routes/userRoutes');
const roomRoutes = require('./routes/roomRoutes');

app.use('/api/user', userRoutes);
app.use('/api/rooms', roomRoutes);
