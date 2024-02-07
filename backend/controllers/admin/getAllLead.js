const { getLeadModel } = require('../../db/tenantDb');
module.exports = async function (req, res, next) {
    try {
        const { tenantId } = req.payload;
        const skip = parseInt(req.query.skip, 10) || 0;
        const limit = parseInt(req.query.limit, 10) || 10;
        let {
            searchQuery = undefined,
        } = req.query;

        let matchQueryStages = [
            { softDelete: false }
        ];

        if (searchQuery !== undefined) {
            matchQueryStages.push({
                $or: [
                    { firstName: { $regex: searchQuery, $options: 'i' } },
                    { lastName: { $regex: searchQuery, $options: 'i' } },
                    { phone: { $regex: searchQuery, $options: 'i' } },
                    { email: { $regex: searchQuery, $options: 'i' } },
                    { leadSource: { $regex: searchQuery, $options: 'i' } }
                ]
            })
        }

        const Lead = await getLeadModel(tenantId);

        const leads = await Lead.aggregate([
            {
                $match: {
                    $and: matchQueryStages
                }

            },
            { $skip: skip },
            { $limit: limit }

        ])

        const totalCount = await Lead.countDocuments({ softDelete: false });
        res.json({ leads, totalCount });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
