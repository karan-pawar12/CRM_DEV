const { getprojectTaskModel } = require('../../db/tenantDb');
const mongoose = require('mongoose');


module.exports = async function (req, res, next) {
    try {
        const { tenantId } = req.payload;
        const projectTask = await getprojectTaskModel(tenantId);

        const projecttasks = await projectTask.aggregate([
            {
                $match: {
                    softDelete: false
                }
            },
            {
                $project: {
                    _id: 0, // Exclude the default _id field
                    id: '$_id', // Rename _id to id
                    name: '$taskName',
                }
            }
        ])

        console.log(projecttasks)

        res.json( projecttasks );


    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }

}