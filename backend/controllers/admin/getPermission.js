const {getUserModel,getRoleModel} = require('../../db/tenantDb')
const adminPermissions = require('../../config/adminPermissions')

module.exports = async function (req, res, next) {
    try {
        const { _id: payloadId, tenantId } = req.payload;
        const User = await getUserModel(tenantId);
        const Role = await getRoleModel(tenantId);
     
        const user = await User.findById(payloadId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

       
        const userRole = user.role[0]; 

        if (userRole === 'Superadmin') {
            return res.status(200).json({ roleName:userRole, permissions:adminPermissions });   
        }
        else {
            
            const role = await Role.findOne({ _id: userRole });

            if (!role) {
                return res.status(404).json({ message: 'Role not found' });
            }

            const roleName = role.name;
            const permissions = role.permissions; 
            return res.status(200).json({ roleName, permissions });
        }


        
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
