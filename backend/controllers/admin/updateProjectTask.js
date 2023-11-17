// const ProjectTask = require('../../schema/projectTask');
// const projectTaskLogs = require('../../methods/projectTaskLogs');
const {getprojectTaskModel,getprojectTaskLogModel} = require('../../db/tenantDb')

module.exports = async function (req, res, next) {

    try {
        const { _id: payloadId,tenantId } = req.payload; // Rename _id to payloadId
        const { _id, fieldName, fieldValue } = req.body;
        const ProjectTask = await getprojectTaskModel(tenantId);



        const projectTask = await ProjectTask.findByIdAndUpdate(_id, { $set: { [fieldName]: fieldValue } });


        // Call the LeadLogs function and pass the required parameters
        // await projectTaskLogs(payloadId, projectTask[fieldName], fieldValue, fieldName);

        res.status(200).end();
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
}