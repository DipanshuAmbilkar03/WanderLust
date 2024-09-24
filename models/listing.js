const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingItems = new Schema({
        title : { 
            type : String,
            required : true,
        },
        description : String,
        image : {
            type : String,
            set: (v) => 
                v === "" ? "https://www.britannica.com/science/beach" : v,
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
    });

const listing = mongoose.model("listing",listingItems);

module.exports = listing;