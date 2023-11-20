const { getRoleModel } = require('../../db/tenantDb')
module.exports = async function (req, res, next) {
    try {
        const { tenantId } = req.payload;
        const skip = parseInt(req.query.skip, 10) || 0;
        const limit = parseInt(req.query.limit, 10) || 10;
        let searchQuery = req.query.searchQuery || '';

        if (searchQuery === "undefined" || searchQuery === undefined) {
            searchQuery = ''
        }

        const Role = await getRoleModel(tenantId);

        const roles = await Role.aggregate([
            {
                $match: {
                    $and: [
                        {
                            softDelete:false
                        },
                        {
                            $or: [
                                { name: { $regex: searchQuery,$options: 'i' } },
                                { description: {$regex: searchQuery,$options: 'i'} }
                            ]
                        }
                    ]
                }
            },
            {$skip:skip},
            {$limit:limit}
        ])

        const totalCount = await Role.countDocuments({ softDelete: false });


        res.json({ roles, totalCount });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}