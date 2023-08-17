const express = require('express');
const router = express.Router();
const passport = require('passport');
const localPassport = require('../configs/passport_local');

const uc = require('../controller/userController');

// router for sign in page
router.get('/signinpage' , uc.signInPage);

//user Sign in router
router.post('/signin' , passport.authenticate('local' , {failureRedirect: '/user/signinpage'}) ,uc.createUserSession);

//User sign out
router.get('/signout' , uc.EndUserSession);

//router for sign up page
router.get('/signuppage' , uc.signUpPage);
module.exports = router;