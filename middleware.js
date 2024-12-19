module.exports.isLoggedIn = (req,res,next) => {
    // console.log(req);
    if(!req.isAuthenticated()) {
        // when user is not logged in 

        // redirectUrl save
        req.session.redirectUrl = req.originalUrl;
        req.flash("error" , "you are not logged in");
        return res.redirect("/login");
    }

    next();

};