const Users = require('../models/user');
const Company = require('../models/company');
const Reviews = require('../models/review');
const User = require('../models/user');


//user home page
module.exports.homeView = async function (req, res) {
    try {
        if (req.isAuthenticated()) {
            let homeuser = await Users.findById(req.user.id).populate('empcompany').populate({
                path: 'empcompany',
                populate: {
                    path: 'userList'
                }
            }).populate('feedPending').populate('feedReceived');
            let pendingFeeds = homeuser.feedPending;
            // console.log(homeuser.feedReceived[0], '-------------------');
            res.render('home', {
                title: 'Employee Profile Page',
                homeuser,
                pendingFeeds
            });
        }
        else {
            req.flash('error', 'Session Expired');
            return res.redirect('/');
        }
    } catch (error) {
        console.log('error: ', error);
        req.flash('error', 'error');
    }
}

// sign up page
module.exports.signUpPage = async function (req, res) {
    let AllCompanies = await Company.find({});
    console.log(AllCompanies);
    res.render('signuppage', {
        title: 'ERS | SignUp Page',
        AllCompanies: AllCompanies
    });
}

//Signing Up a New User and adding under a company
module.exports.createUser = async function (req, res) {
    let userCompany
    if (req.user) {
        userCompany = await Company.findById(req.user.empcompany)
    }
    else {
        userCompany = await Company.findById(req.body.empcompany)
    }
    let ExistUser = await Users.findOne({ email: req.body.email });
    try {
        // check if the email id is existing and being used
        if (ExistUser) {
            req.flash('error', 'Use Different Mail Id / Username...');
            res.redirect('back');
        }
        else {
            // validating password
            if (req.body.password != req.body.confPass) {
                req.flash('error', 'User Not Created.., Please validate Password While confirming');
                return res.redirect('back');
            }
            else {
                let createdUser = await Users.create({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    confPass: req.body.confPass,
                    empcompany: req.user ? req.user.empcompany : userCompany.id,
                    empType: "employee",
                    Rank: Number.MAX_VALUE,
                });
                console.log(createdUser);
                userCompany.userList.push(createdUser.id);
                userCompany.save();
                // console.log(userCompany.userList);
                req.flash('success', 'User Created');
                if (!req.user) {
                    return res.redirect('back');
                }
                else {
                    return res.redirect('/admin/adminPage');
                }
            }
        }
    } catch (error) {
        req.flash('error', 'Error...!')
        console.log('Error: ', error);
        return
    }
}


// Creating a user session
module.exports.createUserSession = async function (req, res) {
    let popUser = await Users.findById(req.user.id).populate('empcompany');
    // console.log(popUser.empcompany);
    req.flash('success', 'User Logged in');

    return res.redirect('/')


}

// Ending a session
module.exports.EndUserSession = async function (req, res) {
    req.logout(async function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'User Logged Out');
        return res.redirect('/');
    })
}

// Asking feedback or review to an employee
module.exports.askFeedback = async function (req, res) {
    try {
        if (req.isAuthenticated()) {
            let feedSender = await Users.findById(req.params.senderId);
            // console.log(req.params.senderId, req.params.receiverId , feedSender);
            if (feedSender.feedPending.indexOf(req.params.receiverId)) {
                feedSender.feedPending.push(req.params.receiverId);
            }
            req.flash('success', 'Feedback request sent');
            feedSender.save();
            
            return res.redirect('back');
        }
    } catch (error) {
        console.log('Error:', error);
        req.flash('error', 'There is an error while sending feedback request');
        res.redirect('back');
    }
}


//posting a feedback

module.exports.postFeedback = async function (req, res) {
    try {
        let feedReceiverId = req.params.feedReceiverId;
        let feedSenderId = req.params.feedSenderId;
        let currFeed = await Reviews.create({
            sender: feedSenderId,
            recepient: feedReceiverId,
            comment: req.body.comment,
            rating: req.body.rating
        });
        // populating the data and sending it to the views
        let Sender = await Users.findByIdAndUpdate(feedSenderId, { $pull: { feedPending: feedReceiverId } });
        let Receiver = await Users.findByIdAndUpdate(feedReceiverId, { $push: { feedReceived: currFeed.id } }).populate('feedReceived');
        console.log('logged-------------------', Receiver.feedReceived);
        req.flash('success', 'Feedback sent');
        res.redirect('back');
    } catch (error) {
        req.flash('error' , 'Internal Server Error');
        console.log('Error:' , error);
    }
}

