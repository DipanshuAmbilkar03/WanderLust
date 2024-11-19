const express = require("express");
const app = express();

// requirements :
const users = require("./routes/user.js");
const posts = require("./routes/post.js");

app.use("/user" ,users);
app.use("/post" ,posts);

// root directory
app.get("/" , (req,res) => {
    res.send("Root directory");
});

app.listen("3000" , ()=> {
    console.log(`listening to port 3000`);
});