const {connect} = require('./dbConnection');
const userSchema = require('../schema/user');
const roleSchema = require('../schema/role');
const notificationSchema = require('../schema/notification');
const leadSchema = require('../schema/lead');
const leadLogSchema = require('../schema/leadLogs');
const meetingSchema = require('../schema/meeting');
const callSchema = require('../schema/call');
const clientSchema = require('../schema/client');
const contactSchema = require('../schema/contact');
const dealSchema = require('../schema/deal');
const emailSchema = require('../schema/emailer');
const productSchema = require('../schema/product');
const projectSchema = require('../schema/project');
const saleSchema = require('../schema/sale');
const taskSchema = require('../schema/task');
const vendorSchema = require('../schema/vendor');
const projectTaskSchema = require('../schema/projectTask');
const projectLogSchema = require('../schema/projectLogs');
const projectTaskLogSchema = require('../schema/projectTaskLogs');
const messageSchema = require('../schema/message');
const chatRoomSchema = require('../schema/chatroom');

const url = "mongodb://localhost:27017";

let db;

const getTenantDB = async(tenantId)=>{
    const dbName = `${tenantId}`;
    db = db ? db:await connect(url);

    
    let tenantDb = db.useDb(dbName,{useCache:true});
    return tenantDb;

}

// jsonwebtoken = req.payload.tenantId;

const getModel = async (tenantId, collectionName, schema) => {
    const tenantDb = await getTenantDB(tenantId);
    return tenantDb.model(collectionName, schema);
}

const getUserModel = async (tenantId) => {
    return getModel(tenantId, 'user', userSchema);
}

const getRoleModel = async (tenantId) => {
    return getModel(tenantId, 'role', roleSchema);
}

const getNotificationModel = async (tenantId) => {
    return getModel(tenantId, 'notification',notificationSchema)
}

const getLeadModel = async (tenantId) => {
    return getModel(tenantId,'lead',leadSchema)
}

const getLeadLogModel = async (tenantId) => {
    return getModel(tenantId,'leadlog',leadLogSchema);
}

const getMeetingModel = async (tenantId) => {
    return getModel(tenantId,'meeting',meetingSchema);
}

const getCallModel = async (tenantId) => {
    return getModel(tenantId,'call',callSchema);
}

const getClientModel = async (tenantId) => {
    return getModel(tenantId,'client',clientSchema);
}

const getContactModel = async (tenantId) => {
    return getModel(tenantId,'contact',contactSchema);
}

const getDealModel = async (tenantId) => {
    return getModel(tenantId,'deal',dealSchema);
}

const getEmailModel = async(tenantId) => {
    return getModel(tenantId,'email',emailSchema);
}

const getProductModel = async(tenantId) => {
    return getModel(tenantId,'product',productSchema);
}

const getProjectModel = async(tenantId) => {
    return getModel(tenantId,'project',projectSchema);
}

const getSaleModel = async(tenantId) => {
    return getModel(tenantId,'sale',saleSchema);
}

const getTaskModel = async(tenantId) => {
    return getModel(tenantId,'task',taskSchema);
}

const getvendorModel = async(tenantId) => {
    return getModel(tenantId,'vendor',vendorSchema);
}

const getprojectTaskModel = async(tenantId) => {
    return getModel(tenantId,'projecttask',projectTaskSchema);
}

const getprojectLogModel = async(tenantId) => {
    return getModel(tenantId,'projectlog',projectLogSchema);
}

const getprojectTaskLogModel = async(tenantId) => {
    return getModel(tenantId,'projecttasklog',projectTaskLogSchema);
}

const getMessageModel = async(tenantId) => {
    return getModel(tenantId,'message',messageSchema);
}

const getChatRoomModel = async(tenantId) => {
    return getModel(tenantId,'chatroom',chatRoomSchema);
}

module.exports = {
    getUserModel,
    getRoleModel,
    getNotificationModel,
    getLeadModel,
    getLeadLogModel,
    getMeetingModel,
    getCallModel,
    getClientModel,
    getContactModel,
    getDealModel,
    getEmailModel,
    getProductModel,
    getProjectModel,
    getSaleModel,
    getTaskModel,
    getvendorModel,
    getprojectTaskModel,
    getprojectLogModel,
    getprojectTaskLogModel,
    getMessageModel,
    getChatRoomModel
}