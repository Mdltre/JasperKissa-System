const express= require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');

router.get('/attendance/', attendanceController.AttendancePage);
router.post('/attendance/timein', attendanceController.TimeInOut);

module.exports = router;