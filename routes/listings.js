const express = require("express");
const router = express();
const wrapAsync = require("../utils/wrapAsync.js");
const { listingSchema , reviewSchema } = require("../schema.js");
const Listing = require("../models/listing.js"); 
const expressError = require("../utils/expressError.js");


// validation lisitings
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

router.get("/" , wrapAsync(async (req,res) => {
    const allListing  = await Listing.find({});
    res.render('./listings/index.ejs', { allListing });

    // Listing.find({}).then(res => {
    //     console.log(res);
    // })
}))

router.get("/new", (req,res) => {
    res.render("./listings/new.ejs")
})


router.get("/:id",wrapAsync(async (req,res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    res.render("./listings/show.ejs" , {listing});
}))

// create post request

// error handling
// router.post("/", async(req,res,next) => {
//     try {
//         const newListing = new Listing(req.body.listing);
//         await newListing.save();
//         res.redirect("/listings");
//     } catch (err) {
//         next(err);
//     }
// })

// server side error handling 
router.post("/", 
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

router.get("/:id/edit" , wrapAsync(async (req,res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("./listings/edit.ejs" , { listing })
}))

router.get("/:id/delete" , wrapAsync(async (req,res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect(`/listings`);
}))

// Review
router.post("/:id/reviews" ,validateReview, wrapAsync(async(req,res) => {
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
router.delete("/:id/reviews/:reviewId", wrapAsync(async(req,res) => {
    let {id, reviewId} = req.params;
    
    await Listing.findByIdAndUpdate(id , {$pull : {reviews : reviewId}});
    await Review.findByIdAndDelete(reviewId);
    
    res.redirect(`/listings/${id}`);
}));


router.put(
    "/:id" 
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

// router.post("/:id/test" , wrapAsync(async (req , res) => {
//     let { id } = req.params;
//     let listing = await Listing.findById(id);
//     res.render("./listings/test.ejs" , {listing});
// }))

//  <------------------------------------------------------------------>


module.exports = router;