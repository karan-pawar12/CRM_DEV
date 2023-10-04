const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const saleSchema = new Schema({
    dealName:{type:mongoose.Types.ObjectId,default:null},
    purchaseOrder:{type:String},
    customerNo:{type:String},
    dueDate:{type:String},
    quoteName:{type:mongoose.Types.ObjectId,default:null},
    contactName:{type:mongoose.Types.ObjectId,default:null},
    pending:{type:String},
    status:{type:String},
    clientName:{type:mongoose.Types.ObjectId,default:null},
    address: {
        street: { type: String },
        state: { type: String },
        city: { type: String },
        country: { type: String },
        zipCode: { type: String }
    },
    orderedItems:{
        productName:{type:mongoose.Types.ObjectId,default:null},
        Quntity:{type:String},
        listPrice:{type:String},
        amount:{type:String},
        discount:{type:String},
        tax:{type:String},
        total:{type:String}
    },
    termsAndConditions:{type:String},
    createdBy: { type: mongoose.Types.ObjectId, default: null },
    updatedBy: { type: mongoose.Types.ObjectId, default: null },
    description: { type: String }


}, {
    timestamps: true,
});


const Sale = mongoose.model('sale', productSchema)

module.exports = Sale;
