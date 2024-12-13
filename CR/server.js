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

const flash = require("connect-flash")
const path = require("path");

app.use(session(sessionOpt));
app.use(flash());

app.set("view engine", "ejs");
app.set("views" , path.join(__dirname,"./views"));

// register 
app.get("/register" , (req,res) => {
    let { name = "anonymous"} = req.query;
    req.session.name = name;

    if(name == "anonymous") {
        req.flash("error"," user not registered!");
    }else{
        req.flash("success","successfully user name added!");
    }

    res.redirect("/hello");
})

// to say hello to the given query name
// app.get("/hello",(req,res) => {
//     res.render("page.ejs",{name : req.session.name, msg: req.flash("success")});
// })

app.get("/hello",(req,res) => {
    // explicit msg passing
    // res.locals.msg = req.flash("success");

    // seperate variables for msg
    res.locals.successMsg = req.flash("success");
    res.locals.errorMsg = req.flash("error");
    
    res.render("page.ejs",{name : req.session.name});
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