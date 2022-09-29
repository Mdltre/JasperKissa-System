const express= require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

//main employee page
router.get('/employee/home', employeeController.mainHome);

//view and find employee
router.get('/employeelist', employeeController.view);
router.post('/employeelist', employeeController.find);


module.exports = router;