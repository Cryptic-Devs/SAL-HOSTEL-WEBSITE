// controllers/bookingController.js
const db = require('../models/database');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/admission_letters/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'admission-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    // Allow only PDF and image files
    const allowedTypes = /jpeg|jpg|png|pdf/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only .png, .jpg, .jpeg and .pdf files are allowed!'));
    }
  }
});

class BookingController {
  // Submit booking request
  static async requestBooking(req, res) {
    try {
      const { user_id, user_type } = req.user;
      
      // Only students can make bookings
      if (user_type !== 'student') {
        return res.status(403).json({
          success: false,
          message: 'Only students can make booking requests'
        });
      }

      const { room_preference, start_date, end_date } = req.body;

      // Validation
      if (!room_preference || !start_date || !end_date) {
        return res.status(400).json({
          success: false,
          message: 'Room preference, start date, and end date are required'
        });
      }

      // Check if admission letter was uploaded
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'Admission letter is required'
        });
      }

      // Validate dates
      const startDate = new Date(start_date);
      const endDate = new Date(end_date);
      const currentDate = new Date();

      if (startDate < currentDate) {
        return res.status(400).json({
          success: false,
          message: 'Start date cannot be in the past'
        });
      }

      if (endDate <= startDate) {
        return res.status(400).json({
          success: false,
          message: 'End date must be after start date'
        });
      }

      // Get student info to match with room gender
      const studentQuery = 'SELECT gender FROM Student WHERE student_id = ?';
      const student = await db.query(studentQuery, [user_id]);

      if (student.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Student not found'
        });
      }

      const studentGender = student[0].gender;

      // Check if student already has a pending or approved booking
      const existingBookingQuery = `
        SELECT booking_id FROM Booking 
        WHERE student_id = ? AND status IN ('Pending', 'Approved')
      `;
      const existingBookings = await db.query(existingBookingQuery, [user_id]);

      if (existingBookings.length > 0) {
        return res.status(400).json({
          success: false,
          message: 'You already have a pending or approved booking'
        });
      }

      // Find available bed based on room preference and gender
      let bedQuery;
      let queryParams = [studentGender];

      if (room_preference === 'any') {
        bedQuery = `
          SELECT b.bed_id, b.room_id, r.room_number, r.floor, r.room_type 
          FROM Bed b
          JOIN Room r ON b.room_id = r.room_id
          WHERE b.status = 'Available' AND r.gender = ?
          ORDER BY r.floor, r.room_number
          LIMIT 1
        `;
      } else {
        // Specific room preference (e.g., "single", "shared", etc.)
        bedQuery = `
          SELECT b.bed_id, b.room_id, r.room_number, r.floor, r.room_type 
          FROM Bed b
          JOIN Room r ON b.room_id = r.room_id
          WHERE b.status = 'Available' AND r.gender = ? AND r.room_type LIKE ?
          ORDER BY r.floor, r.room_number
          LIMIT 1
        `;
        queryParams.push(`%${room_preference}%`);
      }

      const availableBeds = await db.query(bedQuery, queryParams);

      if (availableBeds.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'No available beds found matching your preferences'
        });
      }

      const selectedBed = availableBeds[0];

      // Create booking record
      const bookingQuery = `
        INSERT INTO Booking (student_id, bed_id, admission_letter, booking_date, start_date, end_date, status)
        VALUES (?, ?, ?, CURDATE(), ?, ?, 'Pending')
      `;

      const admissionLetterPath = req.file.filename;
      
      const result = await db.query(bookingQuery, [
        user_id,
        selectedBed.bed_id,
        admissionLetterPath,
        start_date,
        end_date
      ]);

      // Mock email confirmation
      await BookingController.sendBookingConfirmationEmail(user_id, result.insertId);

      res.status(201).json({
        success: true,
        message: 'Booking request submitted successfully',
        booking: {
          booking_id: result.insertId,
          bed_id: selectedBed.bed_id,
          room_number: selectedBed.room_number,
          floor: selectedBed.floor,
          room_type: selectedBed.room_type,
          start_date,
          end_date,
          status: 'Pending'
        }
      });

    } catch (error) {
      console.error('Booking request error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  // Get user's bookings
  static async getUserBookings(req, res) {
    try {
      const { user_id, user_type } = req.user;

      if (user_type !== 'student') {
        return res.status(403).json({
          success: false,
          message: 'Only students can view their bookings'
        });
      }

      const query = `
        SELECT 
          b.booking_id, b.booking_date, b.start_date, b.end_date, b.status,
          r.room_number, r.floor, r.room_type, r.gender,
          bed.bed_label
        FROM Booking b
        JOIN Bed bed ON b.bed_id = bed.bed_id
        JOIN Room r ON bed.room_id = r.room_id
        WHERE b.student_id = ?
        ORDER BY b.booking_date DESC
      `;

      const bookings = await db.query(query, [user_id]);

      res.json({
        success: true,
        bookings
      });

    } catch (error) {
      console.error('Get bookings error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  // Get available rooms (for room selection)
  static async getAvailableRooms(req, res) {
    try {
      const { user_id } = req.user;

      // Get student gender to filter rooms
      const studentQuery = 'SELECT gender FROM Student WHERE student_id = ?';
      const student = await db.query(studentQuery, [user_id]);

      if (student.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Student not found'
        });
      }

      const studentGender = student[0].gender;

      const query = `
        SELECT 
          r.room_id, r.room_number, r.floor, r.capacity, r.room_type,
          COUNT(b.bed_id) as total_beds,
          COUNT(CASE WHEN b.status = 'Available' THEN 1 END) as available_beds
        FROM Room r
        LEFT JOIN Bed b ON r.room_id = b.room_id
        WHERE r.gender = ?
        GROUP BY r.room_id
        HAVING available_beds > 0
        ORDER BY r.floor, r.room_number
      `;

      const availableRooms = await db.query(query, [studentGender]);

      res.json({
        success: true,
        rooms: availableRooms
      });

    } catch (error) {
      console.error('Get available rooms error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  // Mock email confirmation handler
  static async sendBookingConfirmationEmail(studentId, bookingId) {
    try {
      // Get student details
      const studentQuery = `
        SELECT first_name, last_name, email FROM Student WHERE student_id = ?
      `;
      const student = await db.query(studentQuery, [studentId]);

      if (student.length > 0) {
        const { first_name, last_name, email } = student[0];
        
        // Mock email sending (in production, integrate with email service)
        console.log('=== MOCK EMAIL CONFIRMATION ===');
        console.log(`To: ${email}`);
        console.log(`Subject: Booking Request Confirmation - ${first_name} ${last_name}`);
        console.log(`
        Dear ${first_name} ${last_name},

        Your hostel booking request has been submitted successfully.
        
        Booking ID: ${bookingId}
        Status: Pending Review
        
        You will receive another email once your booking has been reviewed by our staff.
        
        Thank you for choosing our hostel accommodation.
        
        Best regards,
        Hostel Management Team
        `);
        console.log('================================');

        // Create notification record
        const notificationQuery = `
          INSERT INTO Notification (title, message, recipient_type)
          VALUES (?, ?, ?)
        `;
        
        await db.query(notificationQuery, [
          'Booking Request Submitted',
          `Booking request #${bookingId} submitted by ${first_name} ${last_name}`,
          'admin'
        ]);
      }
    } catch (error) {
      console.error('Email confirmation error:', error);
    }
  }
}

// Export upload middleware along with controller
BookingController.upload = upload;

module.exports = BookingController;