const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const nanoid = require('nanoid').nanoid

const roleSchema = new Schema({
    name:{type:String},
    permissions:{type:Array,default:[]}, //read-write,read
    hirerachy:{type:String,default:null},
    createdBy:{type:mongoose.Types.ObjectId,defaul:null},
    updatedBy:{type:mongoose.Types.ObjectId,defaul:null},

}, {
    timestamps: true,
});


const Role = mongoose.model('role', roleSchema)

module.exports = Role;
