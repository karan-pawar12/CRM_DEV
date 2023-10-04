const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
    title:{type:String},
    content:{type:JSON},
    recipients:{type:Array}, 
    // {userId:test123,read:true/false,}

},{
    timestamps:true,
})