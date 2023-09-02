const passport = require('passport');
// Importing passport local strategy
const localStrategy = require('passport-local').Strategy;
const Users = require('../models/user');

// Implementing passport local strategy
passport.use(new localStrategy({
    usernameField: 'email',
    passReqToCallback: true
} , async function(req, email, password, done){

        let user = await Users.findOne({email: email});
        try {
            // Validating the user password
            if(!user || user.password != password ){
                req.flash('error', 'Invalid Username/Password');
                return done(null, false);
            }
            else{
                return done(null , user);
            }
        } catch (error) {
            console.log('Error' , error);
        }

}) );


// Serializing a user using passport js
passport.serializeUser(function(user, done){
    done(null, user.id);
});

//deserializing a user id
passport.deserializeUser(async function(id, done){
    let passportUser = await Users.findById(id);
    done(null, passportUser);
})


// creating function to check the authentication of current user
passport.checkAuthentication = async function(req, res, next){
    // checks if the user is authenticated
    if(await req.isAuthenticated()){ 
        return next();
    }

    return res.redirect('/user/signin');
}

//creating function to set the logged user
passport.setAuthenticatedUser = async function (req, res, next) {
    if (await req.isAuthenticated()) {
        // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;
        
    }
    next();
}

module.exports = passport;
