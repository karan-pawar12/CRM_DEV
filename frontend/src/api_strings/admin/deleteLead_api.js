import { DELETE_LEAD } from "../../resources/urls/admin";
import axios from "../../Interceptor";

async function deleteLead_api(leadId, callback) {
    try {

        const softDelete = true;

        const res = await axios.post(DELETE_LEAD, {
            _id: leadId, softDelete
        });

        if (res) {
            callback(null, res);
        }

    } catch (error) {
        console.log("Unable to delete lead", error);
        callback(error, null);
    }

}

export default deleteLead_api;