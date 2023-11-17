const {getRoleModel} = require('../../db/tenantDb');
const defaultPermissions = require('../../config/defaultPermissions');
module.exports = async function(req,res,next){
    try{
        const {_id,tenantId} = req.payload;
        const Role = await getRoleModel(tenantId);
        const {name,description,createdBy=_id,updatedBy=_id} = req.body;
        let role = null;
        try{
            role = await new Role({name,description,permissions:defaultPermissions,createdBy,updatedBy}).save();
            res.status(201).json(role);
        }catch(error){
            console.log(error.message);
            return res.status(500).end();
        }

    }catch(error){
        console.log(error.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
}