const express = require("express");
const app = express();

// requirements :
const users = require("./routes/user.js");
const posts = require("./routes/post.js");

const session = require("express-session");


app.use(session({secret : "dontlookumfinmybusiness", resave : false,saveUninitialized : true}));

app.get("/getcount" , (req,res) => {
    if(req.session.count) {
        req.session.count++;
    }else{
        req.session.count = 1;
    }
    
    res.send(`total count is ${req.session.count} times`);
})

app.get("/test" , (req,res) => {
    res.send(`this ia a test    `);  
})

app.get("/" , (req,res) => {
    res.send(`this is root directory`);
})

app.listen(3000 , () => {
    console.log(`listening to port 3000`);
})