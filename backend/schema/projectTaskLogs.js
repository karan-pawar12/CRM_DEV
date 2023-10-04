const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const projectTaskLogSchema = new Schema({
    updatedBy:{type:mongoose.Types.ObjectId},
    oldValue:{type:String},
    newValue:{type:String},
    fieldName:{type:String}


}, {
    timestamps: true,
});


const ProjectTaskLogs = mongoose.model('projecttasklog', projectTaskLogSchema)

module.exports = ProjectTaskLogs;
