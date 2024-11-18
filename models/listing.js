const mongoose = require("mongoose");
const { listingSchema } = require("../schema");
const Schema = mongoose.Schema;

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
                v === " " ? "https://unsplash.com/photos/a-snow-covered-mountain-range-with-trees-in-the-foreground-oeFIfQ-LuJM" : v,
        },
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
listingSchema.post("findOneAndDelete) 

const listing = mongoose.model("listing",listingItems);
module.exports = listing;