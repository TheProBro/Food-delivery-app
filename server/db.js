const mongoose = require("mongoose");
const mongo_uri='mongodb+srv://devanshudhawan18:D9hHV6e3d5TldP58@cluster0.dg6mgjf.mongodb.net/tomato?retryWrites=true&w=majority'
const mongoDB=()=>{
    mongoose.connect(mongo_uri,{
        useNewURlParser: true,
        // useUnififedTopology: true,
    })
    .then(() => {
        console.log("Connection Established")
        mongoose.connection.db.collection("food_items").find().toArray()
        .then((data) => {global.food_items=data});
        mongoose.connection.db.collection("food_categories").find().toArray()
        .then((data) => {global.food_categories=data});
    })
    .catch((err) => console.log(err));
}

module.exports=mongoDB;

