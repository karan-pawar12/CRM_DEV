const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ticketmsgSchema = new Schema({
    ticketId:{ type: mongoose.Types.ObjectId, default: null },
    content: {type:String,default: null},
    createdBy: {type: mongoose.Types.ObjectId, default: null},
    msgType:{type:String,default:null},
    cc:{type:Array,default:null}
}, {
    timestamps: true,
});

module.exports = ticketmsgSchema;
