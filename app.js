// REQUIREMENTS
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const path = require("path");
const port = 8080; 
const methodOverride = require('method-override');
const ejsMate = require("ejs-mate");
const expressError = require("./utils/expressError.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport"); 
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

// session 
const sessionOption = {
    secret : "Yohohohoho_brook",
    resave : false,
    saveUninititalize : true, 
    cookie: {
        expires : Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge : 7 * 24 * 60 * 60 * 1000,
        // for cross scripting attack
        httpOnly : true,
    },
};

// session middleware
app.use(session(sessionOption));

// flash 
app.use(flash());


// passport initialization and session setup
app.use(passport.initialize());
app.use(passport.session());

// use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(User.authenticate()));

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
})

// demo user
app.get("/demouser", async (req,res) => {
    let fakeUser = ({
        email : "fake@gmail.com",
        username : "fake",
    });

    // static method
    let registeredUser = await User.register(fakeUser,"fakepass");
    res.send(registeredUser);
})

// express routers
const listingRouter = require("./routes/listings.js");
const reviewsRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

// Mongoose connections
let MONGO_URL = 'mongodb://127.0.0.1:27017/WanderLust';

// middleWares
app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname , "./views"));
app.use(express.urlencoded({extended : true}));
app.use(methodOverride('_method'));

// use ejs-locals for all ejs templates:
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")))


// main connection
main()
    .then(() => {
        console.log("connected to DataBase");
    })
    .catch((err) => console.log(err));

async function main() {
    await mongoose.connect(MONGO_URL);
}

// listings 
app.use("/listings" , listingRouter); 
// reviews
app.use("/listings/:id/reviews" , reviewsRouter);
// users
app.use("/" , userRouter);



app.get("/", (req,res) => {
    res.send("this is root directory.")
    // console.log("this is root route.");
})

// data initialization 
// app.get("/testListing", async (req,res) => {
    // let sampleListing = new Listing(
    //     {
    //         title : "goa",
    //         description : "fantacy of the beach",
    //         price : 1200,
    //         location : "beach",
    //         country : "India",
    //     }
    // );
    // await sampleListing.save();
    // console.log("sample was saved.");
//     res.send("successfully tested")
// });

// error for an entirly different api route
app.all("*" , (req, res, next) => {
    next(new expressError(404 , "Page Not Found!"))
})
    
// error middleware
// app.use((err, req, res, next) => {
//     res.send("something failed");
// })

// error middleware using expressclass
app.use((err, req, res, next) => {
    let {statusCode=500, message="something went wrong"} = err;
    // res.status(statusCode).send(message);

    // for message handling
    // res.render("error.ejs",{message});

    // for error handling
    res.status(statusCode).render("error.ejs", {err});

    // for random error handling
    // res.send("something failed");
})

app.listen(port, () => {
    console.log("app is listening to port 8080")
}); 