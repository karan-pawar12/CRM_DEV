import { CREATE_LEAD } from "../../resources/urls/admin";
import axios from "../../Interceptor";

async function CreateLead_api(firstName, lastName, email, phone, company, rating, leadSource, leadStatus, street, state, city, country, zipcode, description, callback) {
    
    try {
        

        const res = await axios.post(CREATE_LEAD, {
            firstName, lastName, email, phone, company, rating, leadSource, leadStatus, street, state, city, country, zipcode, description
        });

        if(res){
            // Assuming that you have access to the AdminContext
            
            
            // Update the lead state in the context
            callback(null,res);
        }

    } catch (error) {
        console.log("Unable to create lead", error);
        callback(error,null);
    }
}

export default CreateLead_api;
