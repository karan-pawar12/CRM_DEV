const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const projectTaskSchema = new Schema({
    projectId: { type: mongoose.Types.ObjectId, default: null },
    taskName: { type: String },
    description: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    priority: { type: String },
    createdBy: { type: mongoose.Types.ObjectId, default: null },
    updatedBy: { type: mongoose.Types.ObjectId, default: null },
    assignedTo: { type: Array, default: [] },
    status: { type: String, default:"Open" },
    softDelete: { type: Boolean, default: false },
    dependencies: {type:Array, default:[]}

}, {
    timestamps: true,
});


module.exports = projectTaskSchema;
