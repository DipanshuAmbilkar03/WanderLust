const express = require("express");
const app = express();

// user
app.get("/user" , (req,res) => {
    res.send("Got user");
});

app.get("/user/:id" , (req,res) => {
    res.send("Got user id");});


app.post("/user" , (req,res) => {
    res.send("posted user");});


app.delete("/user" , (req,res) => {
    res.send("deleted user");});

// POST
app.get("/post" , (req,res) => {
    res.send("Got post");
});

app.get("/post/:id" , (req,res) => {
    res.send("got post id");
});

app.post("/post" , (req,res) => {
    res.send("posted!");
});


app.delete("/post" , (req,res) => {
    res.send("delete the post");
});


app.get("/" , (req,res) => {
    res.send("Root directory");
});

app.listen("3000" , ()=> {
    console.log(`listening to port 3000`);
});