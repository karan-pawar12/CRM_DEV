import { GET_TICKET } from "../../resources/urls/admin";
import axios from "../../Interceptor";

async function ticketDetails_api(ticketId, callback) {
    try {

        const res = await axios.get(GET_TICKET + "?ticketId=" + ticketId);

        if (res) {
            callback(null, res);
        }
    } catch (error) {
        console.log("Unable to fetch all tickets", error);
        callback(error, null);
    }
}

export default ticketDetails_api;