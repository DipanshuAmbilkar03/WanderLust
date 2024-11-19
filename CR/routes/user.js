const express = require("express");
const router = express.Router();

// user
router.get("/" , (req,res) => {
    res.send("Got user");
});

router.get("/:id" , (req,res) => {
    res.send("Got user id");});


router.post("/" , (req,res) => {
    res.send("posted user");});


router.delete("/:id" , (req,res) => {
    res.send("deleted user");});

module.exports = router;