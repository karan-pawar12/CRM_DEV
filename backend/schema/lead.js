const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const leadSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    phone: { type: Array, default: null },
    leadSource: { type: String },
    leadStatus: { type: String },
    companyName: { type: String },
    rating: { type: String },
    annualRevenue: { type: String },
    createdBy: { type: mongoose.Types.ObjectId, default: null },
    updatedBy: { type: mongoose.Types.ObjectId, default: null },
    address: {
        street: { type: String },
        state: { type: String },
        city: { type: String },
        country: { type: String },
        zipCode: { type: String }
    },
    description: { type: String },
    softDelete: { type: Boolean, default: false }


}, {
    timestamps: true,
});


const Lead = mongoose.model('lead', leadSchema)

module.exports = Lead;
