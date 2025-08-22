const db = require('../models/database');

// Submit a new fault report
exports.createFaultReport = async (req, res) => {
  try {
    const { student_id, room_id, description } = req.body;
    if (!student_id || !room_id || !description) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }
    const report_date = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    await db.query(
      'INSERT INTO Fault_Report (student_id, room_id, description, report_date) VALUES (?, ?, ?, ?)',
      [student_id, room_id, description, report_date]
    );
    res.status(201).json({ success: true, message: 'Fault reported successfully' });
  } catch (error) {
    console.error('Create fault report error:', error);
    res.status(500).json({ success: false, message: 'Failed to report fault', error: error.message });
  }
};

// Get all fault reports for a student
exports.getStudentFaultReports = async (req, res) => {
  try {
    const { student_id } = req.params;
    const [reports] = await db.query(
      'SELECT * FROM Fault_Report WHERE student_id = ? ORDER BY report_date DESC',
      [student_id]
    );
    res.json({ success: true, reports });
  } catch (error) {
    console.error('Get fault reports error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch fault reports', error: error.message });
  }
};