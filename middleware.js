module.exports.isLoggedIn = (req,res,next) => {
// when user is not logged in 
    if(!req.isAuthenticated()) {
        // redirectUrl save
        req.session.redirectUrl = req.originalUrl;
        req.flash("error" , "you are not logged in");
        return res.redirect("/login");
    }
    next();

};

module.exports.saveRedirectUrl = (req,res,next) => {
    if(req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}