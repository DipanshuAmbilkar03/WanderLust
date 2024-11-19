const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { listingSchema , reviewSchema } = require("../schema.js");
const expressError = require("../utils/expressError.js");


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



// Review
router.post("/listings/:id/reviews" ,validateReview, wrapAsync(async(req,res) => {
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
router.delete("/listings/:id/reviews/:reviewId", wrapAsync(async(req,res) => {
    let {id, reviewId} = req.params;
    
    await Listing.findByIdAndUpdate(id , {$pull : {reviews : reviewId}});
    await Review.findByIdAndDelete(reviewId);
    
    res.redirect(`/listings/${id}`);
}));


router.put(
    "/listings/:id" 
    ,wrapAsync(async (req,res) => {
        // if(!req.body.listing) {
        //     throw new expressError(400, "send a valid listing data");
        // }
        let { id } = req.params;
        await Listing.findByIdAndUpdate(id , {...req.body.listing});
        res.redirect(`/listings/${id}`);
}))


module.exports = router;