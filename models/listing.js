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
                "https://images.unsplash.com/photo-1586375300773-8384e3e4916f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGxvZGdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
            set: (v) => 
                v === " " ? v : "https://images.unsplash.com/photo-1586375300773-8384e3e4916f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGxvZGdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
        },
        price : { 
            type : Number, 
            default : 0,
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