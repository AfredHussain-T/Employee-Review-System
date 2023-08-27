

// Sign in page
module.exports.signInPage = async function (req, res) {
    try {
        if (req.isAuthenticated()) {
            return res.redirect('/user/home');
        }
        return res.render('signinpage', {
            title: "User Sign-In page"
        })
    } catch (error) {
        req.flash('error' , error);
        return;
    }
}