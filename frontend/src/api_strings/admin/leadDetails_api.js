import { GET_LEAD } from "../../resources/urls/admin";
import axios from "../../Interceptor";

async function leadDetails_api(leadId, callback) {
    try {
        
        // Define the query parameters as an object
        const queryParams = {
            _id: leadId,
        };

        const res = await axios.get(GET_LEAD + "?leadId=" + leadId);

        if (res) {
            callback(null, res);
        }
    } catch (error) {
        console.log("Unable to fetch all leads", error);
        callback(error, null);
    }
}

export default leadDetails_api;