const {getprojectTaskLogModel} = require('../db/tenantDb')
module.exports = async function ProjectTaskLogs(updatedBy, oldValue, newValue, fieldName,tenantId) {

    const projectTaskLog = await getprojectTaskLogModel(tenantId);

    const projecttasklog = new projectTaskLog({
        updatedBy,
        oldValue,
        newValue,
        fieldName
    });

    await projecttasklog.save();
}