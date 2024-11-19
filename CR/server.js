const express = require("express");
const app = express();

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


app.get("/" , (req,res) => {
    res.send("Root directory");
});

app.listen("3000" , ()=> {
    console.log(`listening to port 3000`);
});