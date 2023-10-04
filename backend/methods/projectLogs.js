const projectlogs = require('../schema/ProjectLogs');
module.exports = async function ProjectLogs(updatedBy, oldValue, newValue, fieldName) {
   

    const projectlog = new projectlogs({
        updatedBy,
        oldValue,
        newValue,
        fieldName
    });

    await projectlog.save();
}