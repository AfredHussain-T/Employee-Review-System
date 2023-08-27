const express = require('express');
const router = express.Router();
const hc = require('../controller/homecontroller');

router.get('/' , hc.signInPage);
router.use('/user', require('./userRoutes'));
router.use('/admin' , require('./adminRoutes'));
module.exports = router;