const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const taskSchema = new Schema({
    taskSubject: { type: String },
    dueDate: { type: Date },
    status: { type: String },
    priority: { type: String },
    reminder: { type: String },
    createdBy: { type: mongoose.Types.ObjectId, default: null },
    updatedBy: { type: mongoose.Types.ObjectId, default: null },
    description: { type: String }


}, {
    timestamps: true,
});


const Task = mongoose.model('task', taskSchema)

module.exports = Task;
