const Role = require('../../schema/role')

module.exports = async function (req, res, next) {
    try {
        const {skip = 0,limit=10} = req.query
        let skipValue = parseInt(skip)
        let limitValue = parseInt(limit)

        const roles = await Role.find({softDelete: false})
        .skip(skipValue)
        .limit(limitValue);

        const totalCount = await Role.countDocuments({ softDelete: false });
            
            
        res.json({roles,totalCount});

    } catch (e) {
        console.log(e.message);
        return res.status(500).end();
    }
}