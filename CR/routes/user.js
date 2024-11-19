const express = require("express");
const router = express.Router();

// user
router.get("/user" , (req,res) => {
    res.send("Got user");
});

router.get("/user/:id" , (req,res) => {
    res.send("Got user id");});


router.post("/user" , (req,res) => {
    res.send("posted user");});


router.delete("/user" , (req,res) => {
    res.send("deleted user");});
