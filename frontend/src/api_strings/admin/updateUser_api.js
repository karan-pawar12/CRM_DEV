import { UPDATE_USER } from "../../resources/urls/admin";
import axios from "../../Interceptor";

async function updateUser_api(id,fieldName,fieldValue, callback) {
    
    try {
        

        const res = await axios.post(UPDATE_USER, {
            _id:id,fieldName,fieldValue
        });

        if(res){
            // Assuming that you have access to the AdminContext
            
            
            // Update the lead state in the context
            callback(null,res);
        }

    } catch (error) {
        console.log("Unable to update lead", error);
        callback(error,null);
    }
}

export default updateUser_api;
