const express = require("express");
const router = express.Router();

// POST
router.get("/" , (req,res) => {
    res.send("Got post");
});

router.get("/:id" , (req,res) => {
    res.send("got post id");
});

router.post("/" , (req,res) => {
    res.send("posted!");
});


router.delete("/:id" , (req,res) => {
    res.send("delete the post");
});

module.exports = router;