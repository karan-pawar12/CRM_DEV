const {getProjectModel,getprojectLogModel} = require('../../db/tenantDb')

module.exports = async function (req, res, next) {

    try {
        const { _id: payloadId,tenantId } = req.payload; // Rename _id to payloadId
        const { _id, fieldName, fieldValue } = req.body;
        const Project = await getProjectModel(tenantId);
        const ProjectLogs = await getprojectLogModel(tenantId);

        const project = await Project.findByIdAndUpdate(_id, { $set: { [fieldName]: fieldValue } });


        // Call the LeadLogs function and pass the required parameters
        await ProjectLogs(payloadId, project[fieldName], fieldValue, fieldName);

        res.status(200).end();
    } catch (e) {
        console.log(e.message);
        return res.status(500).end();
    }
}