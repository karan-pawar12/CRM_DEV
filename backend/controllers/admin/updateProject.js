const Project = require('../../schema/project');
const ProjectLogs = require('../../methods/projectLogs');

module.exports = async function (req, res, next) {

    try {
        const { _id: payloadId } = req.payload; // Rename _id to payloadId
        const { _id, fieldName, fieldValue } = req.body;

        const project = await Project.findByIdAndUpdate(_id, { $set: { [fieldName]: fieldValue } });


        // Call the LeadLogs function and pass the required parameters
        await ProjectLogs(payloadId, project[fieldName], fieldValue, fieldName);

        res.status(200).end();
    } catch (e) {
        console.log(e.message);
        return res.status(500).end();
    }
}