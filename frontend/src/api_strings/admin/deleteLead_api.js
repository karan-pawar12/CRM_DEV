import { DELETE_LEAD } from "../../resources/urls/admin";
import axios from "axios";

function deleteLead_api(leadId, callback) {
    try {

        const token = localStorage.getItem('token');

        const headers = {
            Authorization: `Bearer ${token}`,
        };

        const softDelete = true;

        const res = axios.post(DELETE_LEAD, {
            _id: leadId, softDelete
        }, { headers });

        if (res) {
            callback(null, res);
        }

    } catch (error) {
        console.log("Unable to delete lead", error);
        callback(error, null);
    }

}

export default deleteLead_api;