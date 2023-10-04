const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const productSchema = new Schema({
    productName: { type: String },
    productCode: { type: String },
    vendorName: { type: mongoose.Types.ObjectId, default: null },
    manufacturer: { type: String }, 
    category: { type: String },
    salesStartDate: { type: Date },
    salesEndDate: { type: Date },
    supportStartDate: { type: Date },
    supportEndDate: { type: Date },
    priceInfo: {
        unitPrice: { type: String },
        commisssionRate: { type: String },
        Tax: { type: String }
    },
    createdBy: { type: mongoose.Types.ObjectId, default: null },
    updatedBy: { type: mongoose.Types.ObjectId, default: null },
    description: { type: String }


}, {
    timestamps: true,
});


const Meeting = mongoose.model('product', productSchema)

module.exports = Meeting;
