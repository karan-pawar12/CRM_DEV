import { CREATE_LEAD } from "../../resources/urls/admin";
import axios from "axios";

export default async function CreateLead_api(firstName, lastName, email, phone, company, rating, leadSource, leadStatus, street, state, city, country, zipcode, description, callback) {
    
    try {
        // Get the token from your context or localStorage
        const token = localStorage.getItem('token'); 
        
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        const res = await axios.post(CREATE_LEAD, {
            firstName, lastName, email, phone, company, rating, leadSource, leadStatus, street, state, city, country, zipcode, description
        }, { headers });

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
