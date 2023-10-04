const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const projectLogSchema = new Schema({
    updatedBy:{type:mongoose.Types.ObjectId},
    oldValue:{type:String},
    newValue:{type:String},
    fieldName:{type:String}


}, {
    timestamps: true,
});


const ProjectLogs = mongoose.model('projectlogs', projectLogSchema)

module.exports = ProjectLogs;
