const express = require('express');
const router = express.Router();
const adminCont = require('../controller/adminController')

// register page for a company
router.get('/registerCompany' , adminCont.registerCompanyPage);
// creating a company 
router.post('/createCompany', adminCont.createCompany);

//route to view admin page
router.get('/adminPage' , adminCont.viewAdmin);


//Employee Profile view
router.get('/employeeProfile/:emp_id' , adminCont.employeeProfileView);

//route to update employee role
router.get('/takeAction/:empID' , adminCont.levelUpDown);

//Creating a route for adding an employee in the company
router.get('/adminCreates' , adminCont.createUser);

//Deleting an Employee
router.get('/deleteEmp/:delId' , adminCont.deleteEmployee);

module.exports = router;