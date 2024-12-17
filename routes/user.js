const express = require("express");
const router = express.Router({mergeParams:true});
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");

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

module.exports = router;