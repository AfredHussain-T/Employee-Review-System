const express = require('express');
const router = express.Router();
const hc = require('../controller/homecontroller');

router.get('/' , hc.homeView);
router.use('/user', require('./userRoutes'));

module.exports = router;