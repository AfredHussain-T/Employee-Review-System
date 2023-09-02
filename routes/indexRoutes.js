const express = require('express');
const router = express.Router();
const hc = require('../controller/homecontroller');


// Router for sign in page
router.get('/' , hc.signInPage);

// Router for all the api calls belonging to user
router.use('/user', require('./userRoutes'));

// Router for all the api calls belonging to admin
router.use('/admin' , require('./adminRoutes'));
module.exports = router;