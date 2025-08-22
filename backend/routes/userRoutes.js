// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { body } = require('express-validator');
const userController = require('../controllers/userController');

router.get('/history', auth, userController.getUserHistory);

router.put(
  '/settings',
  auth,
  body('email').optional().isEmail().withMessage('Invalid email format'),
  body('password').optional().isLength({ min: 6 }).withMessage('Password must be at least 6 chars'),
  userController.updateUserSettings
);

module.exports = router;
