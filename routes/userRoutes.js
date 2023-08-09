const express = require('express');
const router = express.Router();

const uc = require('../controller/userController');

router.get('/signin' , uc.signInPage);

module.exports = router;