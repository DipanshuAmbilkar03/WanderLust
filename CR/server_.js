const express = require("express");
const app = express();

// requirements :
const users = require("./routes/user.js");
const posts = require("./routes/post.js");

// cookies parser requirement 
const cookieParser = require("cookie-parser");

// cookies code 
app.use(cookieParser("secretcode"));

// signed cookies 
app.get("/getsigncookies",(req,res) => {
    res.cookie("madeIn","India",{signed : true});
    res.send("signed send!");
    console.dir(req.cookies);
})

// verifing signed cookies 
app.get("/verifycookies" , (req,res) => {
    console.log(req.signedCookies);
    res.send("verified");
})

// cookies 
app.get("/getcookies" , (req, res) => {
    res.cookie("Greet" , "hello");
    res.cookie("Warning" , "You are being tracked");
    res.send("cookies send!");
})

app.get("/greet" ,(req,res) => {
    let {name = "anonymus"} = req.cookies;
    res.send(`hello ,${name}`);
})

// root directory
app.get("/" , (req,res) => {
    console.dir(req.cookies);
    res.send("Root directory");
});

app.use("/user" ,users);
app.use("/post" ,posts);

app.listen("3000" , ()=> {
    console.log(`listening to port 3000`);
});