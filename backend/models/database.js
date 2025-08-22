const mysql = require('mysql2');
const util = require('util');
const fs = require('fs');

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'hostel_management',
  charset: 'utf8mb4',
  ssl: process.env.CA ? { ca: fs.readFileSync(process.env.CA) } : undefined
};


// Create connection pool for better performance
const pool = mysql.createPool({
  ...dbConfig,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});


const query = util.promisify(pool.query).bind(pool);

// Test database connection
const testConnection = async () => {
  try {
    await query('SELECT 1');
    console.log('✅ Database connected successfully');
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    process.exit(1);
  }
};

// Initialize database connection
testConnection();

module.exports = {
  query,
  pool
};