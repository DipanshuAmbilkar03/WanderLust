const express = require("express");
const router = express.Router({mergeParams:true});

router.get("/signup" , (req,res) => {
    res.render("./user/signup.ejs");
})

module.exports = router;