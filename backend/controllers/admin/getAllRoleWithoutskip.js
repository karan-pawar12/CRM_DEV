const {getRoleModel} = require('../../db/tenantDb')

module.exports = async function (req, res, next) {
    try {
        const {tenantId} = req.payload;
        const Role = await getRoleModel(tenantId);
        const roles = await Role.aggregate([
            {
                $project: {
                    _id: 0, // Exclude the default _id field
                    id: '$_id', // Rename _id to id
                    name: 1
                }
            }
        ]);
        res.json(roles);
    } catch (error) {
        console.log(e.message);
        return res.status(500).end();
    }
}
