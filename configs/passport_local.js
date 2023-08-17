const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const Users = require('../models/user');


passport.use(new localStrategy({
    usernameField: 'email',
    passReqToCallback: true
} , async function(req, email, password, done){

        let user = await Users.findOne({email: email});
        try {
            if(!user || user.password != password ){
                console.log('Could not authenticate');
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
        console.log(res.locals.user);
    }
    next();
}

module.exports = passport;
