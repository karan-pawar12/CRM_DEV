const {getLeadLogModel} = require('../db/tenantDb')
module.exports = async function LeadLogs(updatedBy, oldValue, newValue, fieldName,tenantId) {
    
    const leadLogs = await getLeadLogModel(tenantId);

    const leadLog = new leadLogs({
        updatedBy,
        oldValue,
        newValue,
        fieldName
    });

    await leadLog.save();
}