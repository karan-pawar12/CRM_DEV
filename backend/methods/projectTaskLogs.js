const projectTaskLog = require('../schema/projectTaskLogs');
module.exports = async function ProjectTaskLogs(updatedBy, oldValue, newValue, fieldName) {
   

    const projecttasklog = new projectTaskLog({
        updatedBy,
        oldValue,
        newValue,
        fieldName
    });

    await projecttasklog.save();
}