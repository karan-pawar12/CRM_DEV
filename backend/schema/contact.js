const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const contactSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    phone: { type: Array, default: null },
    // accountName: { type: String },
    vendorName: { type: String },
    createdBy: { type: mongoose.Types.ObjectId, default: null },
    updatedBy: { type: mongoose.Types.ObjectId, default: null },
    address: {
        street: { type: String },
        state: { type: String },
        city: { type: String },
        country: { type: String },
        zipCode: { type: String }
    },
    description: { type: String }


}, {
    timestamps: true,
});


const Contact = mongoose.model('contact', contactSchema)

module.exports = Contact;
