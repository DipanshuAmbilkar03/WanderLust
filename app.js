const mongoose = require("mongoose");
const express = require("express");
const app = express();
const path = require("path");
const port = 8080; 
const methodOverride = require('method-override');
const ejsMate = require("ejs-mate");

const Listing = require("./models/listing.js"); 


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

app.get("/listings" , async (req,res) => {
    const allListing  = await Listing.find({});
    res.render('./listings/index.ejs', { allListing });

    // Listing.find({}).then(res => {
    //     console.log(res);
    // })
})

app.get("/listings/new", (req,res) => {
    res.render("./listings/new.ejs")
})


app.get("/listings/:id",async (req,res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("./listings/show.ejs" , {listing});
})

app.post("/listings", async(req,res) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
})

app.get("/listings/:id/edit" , async (req,res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("./listings/edit.ejs" , { listing })
})

app.get("/listings/:id/delete" , async (req,res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect(`/listings`);
})

app.put("/listings/:id" , async (req,res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id , {...req.body.listing});
    res.redirect(`/listings/${id}`);
})
//  <------------------------------------------------------------------>
// test delete this later
app.post("/listings/:id/test" , async (req , res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    res.render("./listings/test.ejs" , {listing});
})
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

app.listen(port, () => {
    console.log("app is listening to port 8080")
});