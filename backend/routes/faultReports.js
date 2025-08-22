const express = require('express');
const router = express.Router();
const faultReportController = require('../controllers/faultReportController');

// Submit a fault report
router.post('/', faultReportController.createFaultReport);

// Get all fault reports for a student
router.get('/:student_id', faultReportController.getStudentFaultReports);

module.exports = router;