const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const vendorSchema = new Schema({
    vendorName: { type: String },
    phone: { type: String },
    email: { type: String }
}, {
    timestamps: true,
});


module.exports = vendorSchema;