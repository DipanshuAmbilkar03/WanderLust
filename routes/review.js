const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const { reviewSchema } = require("../schema.js");
const expressError = require("../utils/expressError.js");
const Review = require("../models/review.js"); 
const Listing = require("../models/listing.js"); 

// validate review function 
const validateReview = (req, res, next) => {
    // using JOI
    let {error} = reviewSchema.validate(req.body);
    
    if(error) {
        let errMsg = error.details.map(
            (el) => el.message
        ).join(","); 
        throw new expressError(400 , errMsg);
    }else {
        next();
    }
}

// Review
router.post("/" ,validateReview, wrapAsync(async(req,res) => {
    console.log(req.params.id);
    let listing = await Listing.findById(req.params.id);

    // reviews object
    // console.log(req.body.review);

    let newReview = new Review(req.body.review);


    listing.reviews.push(newReview);

    await newReview.save();
    req.flash("success" , "new Review added!");
    await listing.save();

    console.log("new review is saved");
    
    let {id} = req.params;
    res.redirect(`/listings/${id}`);
})); 

// delete the review
router.delete("/:reviewId", wrapAsync(async(req,res) => {
    let {id, reviewId} = req.params;
    
    await Listing.findByIdAndUpdate(id , {$pull : {reviews : reviewId}});
    await Review.findByIdAndDelete(reviewId);
    
    req.flash("success" , "Listing deleted!");

    res.redirect(`/listings/${id}`);
}));



module.exports = router;