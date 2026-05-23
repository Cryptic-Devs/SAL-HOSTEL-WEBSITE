const express = require('express');
const mysql = require('mysql2');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

const requireRole = (role) => (req, res, next) => {
  if (!req.user || req.user.user_type !== role) {
    return res.status(403).json({ error: 'Access denied' });
  }
  next();
};

// ===== DB CONNECTION =====
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // your DB password
    database: 'hostel_management'
});

db.connect(err => {
    if (err) throw err;
    console.log('✅ Database connected');
});

// ===== CREATE COMPLAINT (STUDENT) =====
router.post('/complaints', authenticateToken, requireRole('student'), (req, res) => {
    const { title, description } = req.body;
    const user_id = req.user.user_id; // from JWT

    if (!title || !description) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const sql = 'INSERT INTO complaints (user_id, title, description, status) VALUES (?, ?, ?, ?)';
    db.query(sql, [user_id, title, description, 'Pending'], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Complaint submitted successfully', complaint_id: result.insertId });
    });
});

// ===== GET MY COMPLAINTS (STUDENT) =====
router.get('/complaints/my', authenticateToken, requireRole('student'), (req, res) => {
    const sql = 'SELECT * FROM complaints WHERE user_id = ?';
    db.query(sql, [req.user.user_id], (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// ===== GET ALL COMPLAINTS (ADMIN) =====
router.get('/complaints', authenticateToken, requireRole('admin'), (req, res) => {
    const sql = 'SELECT * FROM complaints ORDER BY created_at DESC';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// ===== UPDATE COMPLAINT STATUS (ADMIN) =====
router.put('/complaints/:id', authenticateToken, requireRole('admin'), (req, res) => {
    const { status } = req.body;
    if (!status) {
        return res.status(400).json({ error: 'Status is required' });
    }
    const sql = 'UPDATE complaints SET status = ? WHERE id = ?';
    db.query(sql, [status, req.params.id], (err) => {
        if (err) throw err;
        res.json({ message: 'Complaint status updated' });
    });
});

// ===== DELETE COMPLAINT (ADMIN) =====
router.delete('/complaints/:id', authenticateToken, requireRole('admin'), (req, res) => {
    const sql = 'DELETE FROM complaints WHERE id = ?';
    db.query(sql, [req.params.id], (err) => {
        if (err) throw err;
        res.json({ message: 'Complaint deleted successfully' });
    });
});

module.exports = router;
