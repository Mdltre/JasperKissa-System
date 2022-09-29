const express= require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/adminhome', adminController.adminHome);

//view and find employee
router.get('/adminmanage', adminController.view);
router.post('/adminmanage', adminController.find);

// Add an employee
router.get('/addemployee', adminController.employeeform);
router.post('/addemployee', adminController.createEmployee);

// Update an employee
router.get('/editemployee/:id', adminController.editEmployee);
router.post('/editemployee/:id', adminController.updateEmployee);

// Delete an employee
router.get('/deleteemployee/:id', adminController.deleteEmployee);

module.exports = router;