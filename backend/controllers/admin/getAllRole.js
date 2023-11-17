const {getRoleModel} = require('../../db/tenantDb')
module.exports = async function (req, res, next) {
    try {
        const {tenantId} = req.payload;
        const {skip = 0,limit=10} = req.query
        let skipValue = parseInt(skip)
        let limitValue = parseInt(limit)

        const Role = await getRoleModel(tenantId);

        const roles = await Role.find({softDelete: false})
        .skip(skipValue)
        .limit(limitValue);

        const totalCount = await Role.countDocuments({ softDelete: false });
            
            
        res.json({roles,totalCount});

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}