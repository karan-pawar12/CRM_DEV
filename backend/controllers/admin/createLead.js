const {getLeadModel} = require('../../db/tenantDb'); 

module.exports = async function(req,res,next){
    try{
        const {_id,tenantId} = req.payload;
        const Lead = await getLeadModel(tenantId);

        const {firstName,lastName,email,phone,leadSource,leadStatus,companyName,rating,annualRevenue,createdBy=_id,updatedBy=_id,address,description} = req.body;
        let lead = null;
        try{
            lead = await new Lead({firstName,lastName,email,phone,leadSource,leadStatus,companyName,rating,annualRevenue,createdBy,updatedBy,address,description}).save();
            res.status(201).json(lead);
        }catch(error){
            console.log(error.message);
            return res.status(500).json({ error: 'Internal server error' });
        }

    }catch(error){
        console.log(error.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
}