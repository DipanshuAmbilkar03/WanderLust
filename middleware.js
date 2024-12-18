module.exports.isLoggedIn = (req,res,next) => {
    if(!req.isAuthenticated()) {
        req.flash("error" , "you are not logged in");
        return res.redirect("/login");
    }

    next();

};