const Users = require('../models/user');

// Sign in page
module.exports.signInPage = async function(req,res){
    res.render('signinpage');
}

// sign up page
module.exports.signUpPage = async function(req,res){
    res.render('signuppage');
}


// Creating a user session
module.exports.createUserSession = async function(req, res){
    
        res.redirect('/');
}

// Ending a session
module.exports.EndUserSession = async function(req, res){
    req.logout(async function(err){
        if(err){
            return next(err);
        }
        return res.redirect('/user/signinpage')
    })
}


