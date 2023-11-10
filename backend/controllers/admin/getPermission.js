const User = require('../../schema/user');
const Role = require('../../schema/role'); 
const adminPermissions = require('../../config/adminPermissions')

module.exports = async function (req, res, next) {
    try {
        const { _id: payloadId } = req.payload;

     
        const user = await User.findById(payloadId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

       
        const userRole = user.role[0]; 

        if (userRole === 'admin') {
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
        return res.status(500).json({ message: 'Error retrieving user role and permissions' });
    }
};
