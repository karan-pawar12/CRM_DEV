import { CREATE_TICKET } from "../../resources/urls/admin";
import axios from '../../Interceptor';

async function CreateTicket_api(subject,type,status,priority,product,description,assignedTo, callback) {
    try {
        // role name and description add them 
        const res = await axios.post(CREATE_TICKET, {
            subject,type,status,priority,product,description,assignedTo
        });

        if (res) {
            callback(null, res);
        }

    } catch (error) {
        console.log("Unable to create role", error);
        callback(error, null);
    }
}

export default CreateTicket_api;