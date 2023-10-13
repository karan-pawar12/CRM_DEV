import { UPDATE_ROLE } from "../../resources/urls/admin";
import axios from "../../Interceptor";

async function updateRole_api(id,fieldName,fieldValue, callback) {
    
    try {
        

        const res = await axios.post(UPDATE_ROLE, {
            _id:id,fieldName,fieldValue
        });

        if(res){
            // Assuming that you have access to the AdminContext
            
            
            // Update the lead state in the context
            callback(null,res);
        }

    } catch (error) {
        console.log("Unable to update role", error);
        callback(error,null);
    }
}

export default updateRole_api;