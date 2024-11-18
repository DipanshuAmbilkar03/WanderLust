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


const validateFunc = (req, res, next) => {
    // using JOI
    let {error} = listingSchema.validate(req.body);
    
    if(error) {
        let errMsg = error.details.map(
            (el) => el.message
        ).join(","); 
        throw new expressError(400 , error);
    }else {
        next();
    }
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

app.get("/listings" , wrapAsync(async (req,res) => {
    const allListing  = await Listing.find({});
    res.render('./listings/index.ejs', { allListing });

    // Listing.find({}).then(res => {
    //     console.log(res);
    // })
}))

app.get("/listings/new", (req,res) => {
    res.render("./listings/new.ejs")
})


app.get("/listings/:id",wrapAsync(async (req,res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    res.render("./listings/show.ejs" , {listing});
}))

// create post request

// error handling
// app.post("/listings", async(req,res,next) => {
//     try {
//         const newListing = new Listing(req.body.listing);
//         await newListing.save();
//         res.redirect("/listings");
//     } catch (err) {
//         next(err);
//     }
// })

// server side error handling 
app.post("/listings", 
    validateFunc,
    wrapAsync(async(req,res,next) => {
    // if(!req.body.listing) {
    //     throw new expressError(400 , "Please provide a listing.");
    // }

    console.log("Request Body:", req.body.listing);

    // using JOI
    let result_of_listingSchema = listingSchema.validate(req.body);
    console.log(result_of_listingSchema);
    
    if(result_of_listingSchema.error){
        throw new expressError(400 , result_of_listingSchema.error);
    }

    const newListing = new Listing(req.body.listing);

    // if(!newListing.title) {
    //     throw new expressError(400, "Please provide a title for the listing.");
    // }
    // if(!newListing.description) {
    //     throw new expressError(400, "Please provide a description for the listing.");
    // }
    // if(!newListing.location) {
    //     throw new expressError(400, "Please provide a location for the listing.");
    // }

    await newListing.save();
    res.redirect("/listings");
}))

app.get("/listings/:id/edit" , wrapAsync(async (req,res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("./listings/edit.ejs" , { listing })
}))

app.get("/listings/:id/delete" , wrapAsync(async (req,res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect(`/listings`);
}))

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

//  <------------------------------------------------------------------>
// test delete this later

// app.post("/listings/:id/test" , wrapAsync(async (req , res) => {
//     let { id } = req.params;
//     let listing = await Listing.findById(id);
//     res.render("./listings/test.ejs" , {listing});
// }))

//  <------------------------------------------------------------------>

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