const {getLeadModel} = require('../../db/tenantDb'); 

module.exports = async function(req,res,next){
    try{
        const {_id,tenantId} = req.payload;
        const Lead = await getLeadModel(tenantId);

        const {firstName,lastName,email,phone,leadSource,leadStatus,companyName,rating,annualRevenue,createdBy=_id,updatedBy=_id,address,description} = req.body;
        let lead = null;
        try{
            lead = await new Lead({firstName,lastName,email,phone,leadSource,leadStatus,companyName,rating,annualRevenue,createdBy,updatedBy,address,description}).save();
            res.json(lead);
        }catch(e){
            console.log(e.message);
            return res.status(500).end();
        }

    }catch(e){
        console.log(e.message);
        return res.status(500).end();
    }
}