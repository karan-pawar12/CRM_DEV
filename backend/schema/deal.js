const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const dealSchema = new Schema({
    dealOwner: {type:String},
    amount: { type: String },
    dealName: { type: String },
    closingDate: { type: Date },
    stage: { type: String },
    type: { type: String },
    leadSource: { type: String },
    campaignSource: { type: String },
    contactName: { type: String },
    createdBy: { type: mongoose.Types.ObjectId, default: null },
    updatedBy: { type: mongoose.Types.ObjectId, default: null },
    description: { type: String }


}, {
    timestamps: true,
});


module.exports = dealSchema;