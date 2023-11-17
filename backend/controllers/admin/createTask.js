const {getTaskModel} = require('../../db/tenantDb')

module.exports = async function (req,res,next) {
    try {
        const { _id,tenantId } = req.payload;
        const { taskSubject, dueDate, status, priority, reminder, createdBy=_id, updatedBy=_id, description } = req.body;
        const Task = await getTaskModel(tenantId);
        let task = null;
        try {
            task = await new Task({ taskSubject, dueDate, status, priority, reminder, createdBy, updatedBy, description }).save();
            res.status(201).json(task);
        } catch (error) {
            console.log(error.message);
            return res.status(500).end();
        }

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
}