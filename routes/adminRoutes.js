const express = require('express');
const router = express.Router();
const adminCont = require('../controller/adminController')

// register page for a company
router.get('/registerCompany' , adminCont.registerCompanyPage);
// creating a company 
router.post('/createCompany', adminCont.createCompany);

module.exports = router;