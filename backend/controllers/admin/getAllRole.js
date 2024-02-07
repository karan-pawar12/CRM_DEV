const { getRoleModel } = require('../../db/tenantDb')
module.exports = async function (req, res, next) {
    try {
        const { tenantId } = req.payload;
        const skip = parseInt(req.query.skip, 10) || 0;
        const limit = parseInt(req.query.limit, 10) || 10;

        let {
            searchQuery = undefined,
        } = req.query;

        const Role = await getRoleModel(tenantId);

        let matchQueryStages = [
            { softDelete: false }
        ];

        if (searchQuery !== undefined) {
            matchQueryStages.push({
                $or: [
                    { name: { $regex: searchQuery, $options: 'i' } },
                    { description: { $regex: searchQuery, $options: 'i' } }
                ]
            })
        }

        const roles = await Role.aggregate([
            {

                $match: {
                    $and: matchQueryStages
                }

            },
            { $skip: skip },
            { $limit: limit }
        ])

        const totalCount = await Role.countDocuments({ softDelete: false });


        res.json({ roles, totalCount });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}