const { getTenantModel } = require('../../db/adminDb');
const {getUserModel} = require('../../db/tenantDb')

module.exports = async function(req,res,next){

    const {
        email,username,phone,password 
    } = req.body;


    console.log(email,username,phone,password);

    const Tenant = await getTenantModel();

    let tenant;
    
    try{
        tenant = await  Tenant.findOne({
            $or:[
                {email},{phone},{username}
            ]
        });

        
        if(tenant){
            return res.status(409).end("Tenant already exists");

        }else{
            
            try{
                tenant = await  new Tenant({
                    email,username,password,phone
                }).save();

                if(tenant){
                    res.json(tenant);
                }
            }catch(e){
                return res.status(500).end(e.message);

            }


        }

    }catch(e){
        
        return res.status(500).end(e.message);
    }

       


}