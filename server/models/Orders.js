const mongoose = require('mongoose');
const {Schema} = mongoose;

const orderSchema = new Schema({
    email:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    data:{
        type:Array,
        required:true
    }
});

module.exports = mongoose.model("order", orderSchema);