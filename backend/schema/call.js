const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const callSchema = new Schema({
    contactType: { type: String },
    contactId: { type: String },
    callOwnerId:{type:String},
    callType: { type: String },
    status: { type: String },
    from: { type: Date },
    callstartTime: { type: String },
    subject: { type: String },
    reminder: { type: String },
    purpose: {
        callPurpose: { type: String },
        callAgenda: { type: String }
    },
    createdBy: { type: mongoose.Types.ObjectId, default: null },
    updatedBy: { type: mongoose.Types.ObjectId, default: null },
    description: { type: String }


}, {
    timestamps: true,
});


const Call = mongoose.model('call', callSchema)

module.exports = Call;
