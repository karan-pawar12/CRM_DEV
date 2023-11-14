const {connect} = require('./dbConnection');
const mongoose = require('mongoose');
const tenantSchema = require('../schema/tenant');

const url = "mongodb://localhost:27017/crmadmindb";

let db;

const getDb = async() => {
    return db ? db: await connect(url);
}

const getTenantModel = async ()=>{
    const adminDb = await getDb();
    return adminDb.model('tenants',tenantSchema)
}

module.exports = {
    getTenantModel
}
