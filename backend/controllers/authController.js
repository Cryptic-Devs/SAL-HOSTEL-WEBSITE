// controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models/database');

// JWT Secret (should be in environment variables)
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

class AuthController {
  // User Registration (Student, Admin, Staff)
  static async register(req, res) {
    try {
      const { user_type = 'student' } = req.body;

      // Validation based on user type
      if (user_type === 'student') {
        const {
          first_name,
          last_name,
          gender,
          contact_number,
          email,
          level,
          program_of_study,
          password
        } = req.body;

        // Student validation
        if (!first_name || !last_name || !gender || !contact_number || !email || !level || !program_of_study || !password) {
          return res.status(400).json({
            success: false,
            message: 'Student registration requires: first_name, last_name, gender, contact_number, email, level, program_of_study, password'
          });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          return res.status(400).json({
            success: false,
            message: 'Invalid email format'
          });
        }

        // Password validation
        if (password.length < 6) {
          return res.status(400).json({
            success: false,
            message: 'Password must be at least 6 characters long'
          });
        }

        // Check if student email already exists
        const existingUser = await db.query('SELECT email FROM Student WHERE email = ?', [email]);
        
        if (existingUser.length > 0) {
          return res.status(400).json({
            success: false,
            message: 'Email already registered'
          });
        }

        // Hash password
        const saltRounds = 12;
        const password_hash = await bcrypt.hash(password, saltRounds);

        // Insert student
        const query = `INSERT INTO Student (first_name, last_name, gender, contact_number, email, level, program_of_study, password_hash) 
                       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        
        await db.query(query, [first_name, last_name, gender, contact_number, email, level, program_of_study, password_hash]);

        res.status(201).json({
          success: true,
          message: 'Student registered successfully'
        });

      } else if (user_type === 'admin') {
        const {
          name,
          email,
          phone_number,
          role,
          password
        } = req.body;

        // Admin validation
        if (!name || !email || !phone_number || !role || !password) {
          return res.status(400).json({
            success: false,
            message: 'Admin registration requires: name, email, phone_number, role, password'
          });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          return res.status(400).json({
            success: false,
            message: 'Invalid email format'
          });
        }

        // Password validation
        if (password.length < 6) {
          return res.status(400).json({
            success: false,
            message: 'Password must be at least 6 characters long'
          });
        }

        // Check if admin email already exists
        const existingUser = await db.query('SELECT email FROM Admin WHERE email = ?', [email]);
        
        if (existingUser.length > 0) {
          return res.status(400).json({
            success: false,
            message: 'Email already registered'
          });
        }

        // Hash password
        const saltRounds = 12;
        const password_hash = await bcrypt.hash(password, saltRounds);

        // Insert admin
        const query = `INSERT INTO Admin (name, email, phone_number, role, password_hash) VALUES (?, ?, ?, ?, ?)`;
        await db.query(query, [name, email, phone_number, role, password_hash]);

        res.status(201).json({
          success: true,
          message: 'Admin registered successfully'
        });

      } else if (user_type === 'staff') {
        const {
          name,
          email,
          phone_number,
          role,
          department,
          password
        } = req.body;

        // Staff validation
        if (!name || !email || !phone_number || !role || !password) {
          return res.status(400).json({
            success: false,
            message: 'Staff registration requires: name, email, phone_number, role, password (department is optional)'
          });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          return res.status(400).json({
            success: false,
            message: 'Invalid email format'
          });
        }

        // Password validation
        if (password.length < 6) {
          return res.status(400).json({
            success: false,
            message: 'Password must be at least 6 characters long'
          });
        }

        // Check if staff email already exists
        const existingUser = await db.query('SELECT email FROM Staff WHERE email = ?', [email]);
        
        if (existingUser.length > 0) {
          return res.status(400).json({
            success: false,
            message: 'Email already registered'
          });
        }

        // Hash password
        const saltRounds = 12;
        const password_hash = await bcrypt.hash(password, saltRounds);

        // Insert staff
        const query = `INSERT INTO Staff (name, email, phone_number, role, department, password_hash, date_hired) VALUES (?, ?, ?, ?, ?, ?, CURDATE())`;
        await db.query(query, [name, email, phone_number, role, department, password_hash]);

        res.status(201).json({
          success: true,
          message: 'Staff registered successfully'
        });

      } else {
        return res.status(400).json({
          success: false,
          message: 'Invalid user_type. Must be: student, admin, or staff'
        });
      }

    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

  // Login (Student, Admin, Staff)
  static async login(req, res) {
    try {
      const { email, password, user_type = 'student' } = req.body;

      // Validation
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: 'Email and password are required'
        });
      }

      let query;
      
      // Determine query based on user type
      if (user_type === 'student') {
        query = 'SELECT student_id as user_id, first_name, last_name, email, password_hash FROM Student WHERE email = ?';
      } else if (user_type === 'admin') {
        query = 'SELECT admin_id as user_id, name, email, password_hash, role FROM Admin WHERE email = ?';
      } else if (user_type === 'staff') {
        query = 'SELECT staff_id as user_id, name, email, password_hash, role, department FROM Staff WHERE email = ?';
      } else {
        return res.status(400).json({
          success: false,
          message: 'Invalid user_type. Must be: student, admin, or staff'
        });
      }

      const users = await db.query(query, [email]);

      if (users.length === 0) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password'
        });
      }

      const user = users[0];

      // Verify password
      const isValidPassword = await bcrypt.compare(password, user.password_hash);

      if (!isValidPassword) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password'
        });
      }

      // Create JWT token
      const tokenPayload = {
        user_id: user.user_id,
        email: user.email,
        user_type: user_type
      };

      const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: '24h' });

      // Remove password from response
      delete user.password_hash;

      res.json({
        success: true,
        message: 'Login successful',
        token,
        user: {
          ...user,
          user_type
        }
      });

    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  // Get Profile
  static async getProfile(req, res) {
    try {
      const { user_id, user_type } = req.user;

      let query;
      
      if (user_type === 'student') {
        query = `SELECT student_id, first_name, last_name, gender, contact_number, email, 
                        level, program_of_study, profile_picture FROM Student WHERE student_id = ?`;
      } else if (user_type === 'admin') {
        query = `SELECT admin_id, name, email, phone_number, role FROM Admin WHERE admin_id = ?`;
      } else if (user_type === 'staff') {
        query = `SELECT staff_id, name, email, phone_number, role, department, date_hired FROM Staff WHERE staff_id = ?`;
      }

      const users = await db.query(query, [user_id]);

      if (users.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      res.json({
        success: true,
        user: {
          ...users[0],
          user_type
        }
      });

    } catch (error) {
      console.error('Get profile error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }
}

module.exports = AuthController;