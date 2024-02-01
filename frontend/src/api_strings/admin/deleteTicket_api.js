import { DELETE_TICKET } from "../../resources/urls/admin";
import axios from "../../Interceptor";

async function deleteTicket_api(ticketID, callback) {
    try {

        const softDelete = true;

        const res = await axios.post(DELETE_TICKET, {
            _id: ticketID, softDelete
        });

        if (res) {
            callback(null, res);
        }

    } catch (error) {
        console.log("Unable to delete ticket", error);
        callback(error, null);
    }

}

export default deleteTicket_api;