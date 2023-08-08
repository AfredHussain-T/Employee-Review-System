const express = require('express');
const router = express.Router();
const hc = require('../controller/homecontroller');

router.get('/' , hc.homeView);


module.exports = router;