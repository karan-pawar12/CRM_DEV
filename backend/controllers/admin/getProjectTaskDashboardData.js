const {getprojectTaskModel} = require('../../db/tenantDb');
const mongoose = require('mongoose');

module.exports = async function (req, res, next) { 
    const { projectTaskId } = req.query;
    const { tenantId } = req.payload;
    const projectTask = await getprojectTaskModel(tenantId);

    const openTaskCount = await projectTask.countDocuments({status:0, projectId: new mongoose.Types.ObjectId(projectTaskId)});
    const InProgressCount = await projectTask.countDocuments({status:1, projectId: new mongoose.Types.ObjectId(projectTaskId)});
    const CompletedCount = await projectTask.countDocuments({status:2, projectId: new mongoose.Types.ObjectId(projectTaskId)});

    

    res.json({openTaskCount,InProgressCount,CompletedCount});

}