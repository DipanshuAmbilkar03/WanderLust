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


// validate review function 
const validateReview = (req, res, next) => {
    // using JOI
    let {error} = reviewSchema.validate(req.body);
    
    if(error) {
        let errMsg = error.details.map(
            (el) => el.message
        ).join(","); 
        throw new expressError(400 , error);
    }else {
        next();
    }
}

// const validateFunc = (req, res, next) => {
//     const { error } = listingSchema.validate(req.body);
//     if (error) {
//         const errorMsg = error.details.map((el) => el.message).join(",");
//         return res.status(400).send(errorMsg);
//     }
//     next();
// };

app.use("/listings" , listings);    


// Review
app.post("/listings/:id/reviews" ,validateReview, wrapAsync(async(req,res) => {
    let listing = await Listing.findById(req.params.id);

    // reviews object
    // console.log(req.body.review);

    let newReview = new Review(req.body.review);


    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    console.log("new review is saved");
    
    let {id} = req.params;
    res.redirect(`/listings/${id}`);
})); 

// delete the review
app.delete("/listings/:id/reviews/:reviewId", wrapAsync(async(req,res) => {
    let {id, reviewId} = req.params;
    
    await Listing.findByIdAndUpdate(id , {$pull : {reviews : reviewId}});
    await Review.findByIdAndDelete(reviewId);
    
    res.redirect(`/listings/${id}`);
}));


app.put(
    "/listings/:id" 
    ,wrapAsync(async (req,res) => {
        // if(!req.body.listing) {
        //     throw new expressError(400, "send a valid listing data");
        // }
        let { id } = req.params;
        await Listing.findByIdAndUpdate(id , {...req.body.listing});
        res.redirect(`/listings/${id}`);
}))


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