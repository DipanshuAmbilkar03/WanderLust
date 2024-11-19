const express = require("express");
const app = express();

// user
app.get("/user" , (req,res) => {
    res.send("Root directory");
});

app.get("/user/:id" , (req,res) => {
    res.send("Root directory");
});


app.post("/user" , (req,res) => {
    res.send("Root directory");
});


app.delete("/user" , (req,res) => {
    res.send("Root directory");
});

// POST
app.get("/post" , (req,res) => {
    res.send("Root directory");
});

app.get("/post/:id" , (req,res) => {
    res.send("Root directory");
});


app.post("/post" , (req,res) => {
    res.send("Root directory");
});


app.delete("/post" , (req,res) => {
    res.send("Root directory");
});


app.get("/" , (req,res) => {
    res.send("Root directory");
});

app.listen("3000" , ()=> {
    console.log(`listening to port 3000`);
});