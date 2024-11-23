const express = require("express");
const app = express();

// requirements :
const users = require("./routes/user.js");
const posts = require("./routes/post.js");

const session = require("express-session");
const sessionOpt = {
                    secret : "dontlookumfinmybusiness", 
                    resave : false,
                    saveUninitialized : true
                    };

app.use(session(sessionOpt));

// register 
app.get("/register" , (req,res) => {
    let { name = "anonymous"} = req.query;
    req.session.name = name;
    console.log(req.session.name);
    res.send(name);
})

// to say hello to the given query name
app.get("/hello",(req,res) => {
    
    res.send(`hello ${req.session.name}`)
})

// count number of sessions 
// app.get("/getcount" , (req,res) => {
//     if(req.session.count) {
//         req.session.count++;
//     }else{
//         req.session.count = 1;
//     }

//     res.send(`total count is ${req.session.count} times`);
// })

app.get("/test" , (req,res) => {
    res.send(`this ia a test    `);  
})

app.get("/" , (req,res) => {
    res.send(`this is root directory`);
})

app.listen(3000 , () => {
    console.log(`listening to port 3000`);
})