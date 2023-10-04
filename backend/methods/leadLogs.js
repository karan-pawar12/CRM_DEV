const leadLogs = require('../schema/leadLogs');
module.exports = async function LeadLogs(updatedBy, oldValue, newValue, fieldName) {
   

    const leadLog = new leadLogs({
        updatedBy,
        oldValue,
        newValue,
        fieldName
    });

    await leadLog.save();
}