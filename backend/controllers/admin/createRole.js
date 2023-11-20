const Role = require('../../schema/role');
const defaultPermissions = require('../../config/defaultPermissions');
module.exports = async function(req,res,next){
    try{
        const {_id} = req.payload;
        const {name,description,createdBy=_id,updatedBy=_id} = req.body;
        let role = null;
        try{
            role = await new Role({name,description,permissions:defaultPermissions,createdBy,updatedBy}).save();
            res.json(role);
        }catch(e){
            console.log(e.message);
            return res.status(500).end();
        }

    }catch(e){
        console.log(e.message);
        return res.status(500).end();
    }
}