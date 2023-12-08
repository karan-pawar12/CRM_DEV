const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const taskSchema = new Schema({
    taskSubject: { type: String },
    dueDate: { type: Date },
    status: { type: String },
    priority: { type: String },
    reminder: { type: String },
    participant:{type:mongoose.Types.ObjectId,default:null},
    createdBy: { type: mongoose.Types.ObjectId, default: null },
    updatedBy: { type: mongoose.Types.ObjectId, default: null },
    description: { type: String }


}, {
    timestamps: true,
});


module.exports = taskSchema;
