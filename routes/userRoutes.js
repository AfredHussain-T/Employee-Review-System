const express = require('express');
const router = express.Router();
const passport = require('passport');
const localPassport = require('../configs/passport_local');

const uc = require('../controller/userController');


// Employee home page
router.get('/home' , uc.homeView);

//router for sign up page
router.get('/signuppage' , uc.signUpPage);


//router to create a user and add under a company
router.post('/createUser' , uc.createUser);

//user Sign in router
router.post('/signin' , passport.authenticate('local' , {failureRedirect: '/'}) ,uc.createUserSession);

//User sign out
router.get('/signout' , uc.EndUserSession);

//sending feedback request to employees
router.post('/askingFeedback/:senderId/:receiverId' , uc.askFeedback);

//posting feedback from the reviewer set by admin
router.post('/feed/:feedReceiverId/:feedSenderId' , uc.postFeedback);



module.exports = router;