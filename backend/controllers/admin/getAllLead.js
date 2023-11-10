const Lead = require('../../schema/lead');

module.exports = async function (req, res, next) {
    try {
    
        const skip = parseInt(req.query.skip, 10) || 0;
        const limit = parseInt(req.query.limit, 10) || 10;
        let searchQuery = req.query.searchQuery || '';

        if(searchQuery === "undefined" || searchQuery === undefined){
            searchQuery = ''
        }
        
        const leads = await Lead.aggregate([
            {
                $match:{
                    $and:[
                        {
                            softDelete:false
                        },
                        {
                            $or: [
                                { firstName: { $regex: searchQuery,$options: 'i' } }, 
                                { lastName: { $regex: searchQuery, $options: 'i' } },  
                                { phone: { $regex: searchQuery, $options: 'i' } },
                                { email: { $regex:searchQuery, $options: 'i'}},    
                                { leadSource: { $regex: searchQuery, $options: 'i' } } 
                            ]
                        }
                    ]
                   
                }
                
            },
            {$skip:skip},
            {$limit:limit}
           
        ])

        const totalCount = await Lead.countDocuments({ softDelete: false });
        res.json({leads,totalCount});

    } catch (e) {
        console.error(e.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
