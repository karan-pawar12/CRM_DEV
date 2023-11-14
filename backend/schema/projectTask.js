const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const projectTaskSchema = new Schema({
    projectName: { type: mongoose.Types.ObjectId, default: null },
    createdBy: { type: mongoose.Types.ObjectId, default: null },
    updatedBy: { type: mongoose.Types.ObjectId, default: null },
    description: { type: String },
    participants: { type: Array, default: [] },
    status:{type:String}


}, {
    timestamps: true,
});


module.exports = projectTaskSchema;
