const Lead = require('../../schema/lead');

module.exports = async function (req, res, next) {
    try {
    
        const {skip=0,limit=10} = req.query
        let skipValue = parseInt(skip)
        let limitValue = parseInt(limit)
        // Use Mongoose's select method to retrieve only the specified fields
        const leads = await Lead.find({softDelete: false})
        .skip(skipValue)
        .limit(limitValue)
        
        const totalCount = await Lead.countDocuments({ softDelete: false });

        res.json({leads,totalCount});

    } catch (e) {
        console.error(e.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
