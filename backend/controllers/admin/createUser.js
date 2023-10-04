const User = require('../../schema/user');

module.exports = async function(req,res,next){
    try{
        const {_id} = req.payload;
        const {firstName,lastName,password,email,phone,role,managers,createdBy=_id,updatedBy=_id} = req.body;
        let user = null;
        try{
            user = await new User({firstName,lastName,password,email,phone,role,managers,createdBy,updatedBy}).save();
            res.json(user);
        }catch(e){
            console.log(e.message);
            return res.status(500).end();
        }

    }catch(e){
        console.log(e.message);
        return res.status(500).end();
    }
}