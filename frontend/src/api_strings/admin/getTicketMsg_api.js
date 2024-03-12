import { GET_TICKET_MSG } from "../../resources/urls/admin";
import axios from "../../Interceptor";

async function ticketmsg_api(ticketId, callback) {
    try {

        const res = await axios.get(GET_TICKET_MSG + "?ticketId=" + ticketId);

        if (res) {
            callback(null, res);
        }
    } catch (error) {
        console.log("Unable to fetch all tickets", error);
        callback(error, null);
    }
}

export default ticketmsg_api;