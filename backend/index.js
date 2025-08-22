const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const db = require("./models/database"); // your MySQL connection file

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Test DB connection
db.query("SELECT 1")
  .then(() => console.log("MySQL connected"))
  .catch(err => console.error("DB connection error:", err));

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/rooms", require("./routes/roomRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

