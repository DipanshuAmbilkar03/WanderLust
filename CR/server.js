const express = require("express");
const app = express();

// requirements :
const users = require("./routes/user.js");
const posts = require("./routes/post.js");

// root directory
app.get("/" , (req,res) => {
    res.send("Root directory");
});

app.use("/user" ,users);
app.use("/post" ,posts);

app.listen("3000" , ()=> {
    console.log(`listening to port 3000`);
});