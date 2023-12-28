const { getprojectTaskModel } = require('../../db/tenantDb');
const mongoose = require('mongoose');

module.exports = async function (req, res, next) {
    try {
        const { tenantId } = req.payload;
        const { _id, start, end } = req.body;

        const startDate = new Date(start)
        const endDate = new Date(end)

        const projectTask = await getprojectTaskModel(tenantId);

        const updatedProjectTask = await projectTask.findByIdAndUpdate(_id,
            { $set: { startDate, endDate } },
            { new: true }
        )

        const responseFields = {
            id: updatedProjectTask._id,
            start: updatedProjectTask.startDate,
            end: updatedProjectTask.endDate,
            name: updatedProjectTask.taskName,
            dependencies: updatedProjectTask.dependencies,
            type: 'task'
        };

        console.log(responseFields)

        res.status(200).json(responseFields);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }

}