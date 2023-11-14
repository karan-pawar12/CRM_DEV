const {getprojectLogModel} = require('../db/tenantDb')
module.exports = async function ProjectLogs(updatedBy, oldValue, newValue, fieldName,tenantId) {
    
    const projectlogs = await getprojectLogModel(tenantId);

    const projectlog = new projectlogs({
        updatedBy,
        oldValue,
        newValue,
        fieldName
    });

    await projectlog.save();
}