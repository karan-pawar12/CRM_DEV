const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const clientSchema = new Schema({
    companyName: { type: String },
    companySite: { type: String },
    email: { type: String },
    companyPhoneNo: { type: String },
    clientPhoneNo: {type:String},
    address: {
        street: { type: String },
        state: { type: String },
        city: { type: String },
        country: { type: String },
        zipCode: { type: String }
    },
    industry: { type: String },
    annualRevenue: { type: String },
    softDelete: {type:Boolean},
    createdBy: { type: mongoose.Types.ObjectId, default: null },
    updatedBy: { type: mongoose.Types.ObjectId, default: null },
    description: { type: String }


}, {
    timestamps: true,
});


const Client = mongoose.model('client', clientSchema)

module.exports = Client;


//company no and client no softdeleted = permanant delete should not allowed