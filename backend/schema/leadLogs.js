const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const leadLogSchema = new Schema({
    updatedBy:{type:mongoose.Types.ObjectId},
    oldValue:{type:String},
    newValue:{type:String},
    fieldName:{type:String}


}, {
    timestamps: true,
});


module.exports = leadLogSchema;