const express = require('express');
const mongoDB = require('./configs/mongoose');
// const port = 1004;
const app = express();
require("dotenv").config();
// importing router
const route = require('./routes/indexRoutes');
// Importing cookie parser
const cookieParser = require('cookie-parser');

// Importing Express Session
const expSession = require('express-session');
const passport = require('passport');
const localPassport = require('./configs/passport_local');
// Importing Mongo Store
const mongoStore = require('connect-mongo');

// Importing connect-flash to display alerts
const flash = require('connect-flash');
const flashMiddleware = require('./configs/setFlash');


// middlewares
app.use(express.urlencoded());
app.use(cookieParser());


app.use(express.static('./assets'));

// Setting up view engine

app.set('view engine' ,'ejs');
app.set('views' , './views');

// Implementing express session to store the cookie and to maintain the session of a logged in user
app.use(expSession({
    name: 'EmployeeReviewSystem',
    secret: 'ThisIsAFeedbackApp',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge : 100000000, 
    },
    // Storing the cookie data in mongo db
    store: mongoStore.create({
        mongoUrl: "mongodb://127.0.0.1:27017/emp-rev-system",
        autoRemove: 'disabled'
    }, function(err){
        console.log(err, 'We have this error')
    })
    
}));
// Implementing passport local
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser); 
// Implementing flash messages
app.use(flash());
app.use(flashMiddleware.setFlash);

app.use('/', route);

app.listen(process.env.PORT, function(err){
    if(err){
        console.log('Error while connecting to the port ', err);
        return;
    }

    console.log('The connection has been established on port :', process.env.PORT);
});