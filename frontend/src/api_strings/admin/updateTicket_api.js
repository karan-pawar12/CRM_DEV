import { UPDATE_TICKET } from "../../resources/urls/admin";
import axios from "../../Interceptor";

async function updateTicket_api(id,fieldName,fieldValue, callback) {
    try {
        const res = await axios.post(UPDATE_TICKET, {
            _id:id,fieldName,fieldValue
        });

        if (res) {
            callback(null, res);
        }
    } catch (error) {
        console.log("Unable to update ticket", error);
        callback(error, null);
    }
}

export default updateTicket_api;