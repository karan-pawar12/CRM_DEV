const { getprojectTaskModel } = require('../../db/tenantDb');
const mongoose = require('mongoose');
const moment = require('moment')

module.exports = async function (req, res, next) {
    try {
        const { tenantId } = req.payload;
        const { id } = req.query;
        const projectTask = await getprojectTaskModel(tenantId);

        const projecttasks = await projectTask.aggregate([
            {
                $match: {
                    softDelete: false,
                    projectId: new mongoose.Types.ObjectId(id)

                }
            },
            {
                $project: {
                    start: '$startDate',
                    end: '$endDate',
                    name: '$taskName',
                    type: 'task',
                    dependencies: 1

        

                }
            }
        ])

        if (!projecttasks) {
            return res.status(404).json({ error: 'projecttask not found.' });
        }

   
        res.json(projecttasks);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }


}