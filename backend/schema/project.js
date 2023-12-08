const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const projectSchema = new Schema({
    projectName: { type: String },
    participants: { type: Array,default:[] },
    createdBy: { type: mongoose.Types.ObjectId, default: null },
    updatedBy: { type: mongoose.Types.ObjectId, default: null },
    startDate: { type: Date },
    endDate: { type: Date },
    status:{type:String},
    description: { type: String },
    isPrivate: { type: String },
    priority: { type: String },
    softDelete: { type: Boolean, default: false }

}, {
    timestamps: true,
});


module.exports = projectSchema;
