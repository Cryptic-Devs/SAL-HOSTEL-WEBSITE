const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// =====================
// Middleware Setup
// =====================

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Body parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static file serving
app.use('/public', express.static(path.join(__dirname, 'public')));


const uploadDirs = [
  'public/uploads',
  'public/uploads/admission_letters',
  'public/uploads/profile_pictures'
];

uploadDirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`📁 Created directory: ${dir}`);
  }
});

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// =====================
// Routes Setup
// =====================

// Import routes properly
const apiRoutes = require('./routes/index');
app.use('/api', apiRoutes);


const faultReportRoutes = require('./routes/faultReports');
app.use('/api/fault-reports', faultReportRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'Hostel Management API'
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Hostel Management System API',
    version: '1.0.0',
    endpoints: {
      auth: {
        register: 'POST /api/register',
        login: 'POST /api/login',
        profile: 'GET /api/profile'
      },
      bookings: {
        request: 'POST /api/bookings/request',
        myBookings: 'GET /api/bookings/my-bookings',
        availableRooms: 'GET /api/bookings/available-rooms'
      },
      test: {
        basic: 'GET /api/test',
        protected: 'GET /api/protected-test'
      }
    }
  });
});

// =====================
// Error Handling
// =====================

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found',
    path: req.originalUrl
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('Global error handler:', error);

  // Handle Multer errors
  if (error.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({
      success: false,
      message: 'File size too large. Maximum size is 5MB'
    });
  }

  if (error.message && error.message.includes('Only .png, .jpg, .jpeg and .pdf files are allowed!')) {
    return res.status(400).json({
      success: false,
      message: 'Invalid file type. Only PNG, JPG, JPEG and PDF files are allowed'
    });
  }

  // Handle database errors
  if (error.code === 'ER_DUP_ENTRY') {
    return res.status(400).json({
      success: false,
      message: 'Duplicate entry found'
    });
  }

  if (error.code === 'ECONNREFUSED') {
    return res.status(500).json({
      success: false,
      message: 'Database connection failed'
    });
  }

  // Handle JWT errors
  if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }

  if (error.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      message: 'Token expired'
    });
  }

  // Default error response
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { error: error.message })
  });
});

// =====================
// Server Startup
// =====================

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 API Base URL: http://localhost:${PORT}/api`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  process.exit(0);
});