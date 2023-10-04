const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const vendorSchema = new Schema({
    vendorName: { type: String },
    phone: { type: String },
    email: { type: String }
}, {
    timestamps: true,
});

const Vendor = mongoose.model('vendor',vendorSchema);

module.exports = Vendor;