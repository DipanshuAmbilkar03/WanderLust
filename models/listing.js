const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js"); 

const listingItems = new Schema({
        title : { 
            type : String,
            required : true,
        },
        description : String,
        image : {
            type : String,
            default:
                "https://unsplash.com/photos/a-snow-covered-mountain-range-with-trees-in-the-foreground-oeFIfQ-LuJM",
            set: (v) => 
                v === " " ? v : "https://unsplash.com/photos/a-snow-covered-mountain-range-with-trees-in-the-foreground-oeFIfQ-LuJM",
        },
        /*
        description : String,
        image: {
            type: String,
            default: "https://unsplash.com/photos/a-snow-covered-mountain-range-with-trees-in-the-foreground-oeFIfQ-LuJM",
            set: (v) => v && v.trim() !== "" ? v : "https://unsplash.com/photos/a-snow-covered-mountain-range-with-trees-in-the-foreground-oeFIfQ-LuJM",
        },*/ 
        price : { 
            type : Number, 
        },
        location : { 
            type : String,
        },
        country : { 
            type : String,
        },
        reviews : [
            {
                type : Schema.Types.ObjectId,
                ref : "Review",
            }
        ]
    });

// mongoose listing and review middeleWare
listingItems.post("findOneAndDelete" , async(listing)=>{
    if(listing) {
        await Review.deleteMany({_id: {$in : listing.reviews}});
    }
});

const Listing = mongoose.model("listing",listingItems);
module.exports = Listing;