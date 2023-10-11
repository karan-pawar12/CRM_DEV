import { CREATE_USER } from "../../resources/urls/admin";
import axios from "../../Interceptor";

async function CreateUser_api(firstName,lastName,password,email,phone,role,managers,callback) {
    
    try {
        

        const res = await axios.post(CREATE_USER, {
            firstName,lastName,password,email,phone,role,managers
        });

        if(res){
            // Assuming that you have access to the AdminContext
            
            
            // Update the lead state in the context
            callback(null,res);
        }

    } catch (error) {
        console.log("Unable to create users", error);
        callback(error,null);
    }
}

export default CreateUser_api;
