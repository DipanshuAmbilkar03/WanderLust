// REQUIREMENTS
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const path = require("path");
const port = 8080; 
const methodOverride = require('method-override');
const ejsMate = require("ejs-mate");
const { listingSchema , reviewSchema } = require("./schema.js");
const Listing = require("./models/listing.js"); 

const wrapAsync = require("./utils/wrapAsync.js");
const expressError = require("./utils/expressError.js");

const Review = require("./models/review.js"); 

const listings = require("./routes/listings.js");
const reviews = require("./routes/review.js");

let MONGO_URL = 'mongodb://127.0.0.1:27017/WanderLust';

app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname , "./views"));
app.use(express.urlencoded({extended : true}));
app.use(methodOverride('_method'));
// use ejs-locals for all ejs templates:
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")))


main()
    .then(() => {
        console.log("connected to DataBase");
    })
    .catch((err) => console.log(err));


async function main() {
    await mongoose.connect(MONGO_URL);
}

app.use("/listings" , listings); 
app.use("/reviews" , reviews);    


app.get("/", (req,res) => {
    res.send("this is root directory.")
    // console.log("this is root route.")
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
//     res.send("something failed")
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