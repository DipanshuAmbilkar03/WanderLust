const express = require("express");
const router = express.Router({mergeParams:true});
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");

router.get("/signup" , (req,res) => {
    res.render("./user/signup.ejs");
})

router.post("/signup" , wrapAsync(async(req,res) => {
    try {
        let { username, email ,password} = req.body;
        const newUser = new User({username , email});
        const registeredUser = await User.register(newUser , password);
        console.log(registeredUser);
        req.flash("success" , "Welcome to WanderLust");
        res.redirect("/listings");
    }catch(e) {
        req.flash("error" , e.message);
        res.redirect("/signup");
    }
}))

// login User
router.get("/login", (req, res) => {
    res.render("./user/login.ejs", { messages: req.flash() }); // Pass messages to template
});

router.post("/login",passport.authenticate("local",
                { failureRedirect : "/login", failureFlash : true })
                                                ,(async(req,res) => {

        // let{ user } = req.params;
        req.flash("success", "you are logged in ");
        res.redirect("listings");
}))

module.exports = router;