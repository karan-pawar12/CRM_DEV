import { UPDATE_ROLE } from "../../resources/urls/admin";
import axios from "../../Interceptor";

async function updateRole_api(id, params, callback) {
    try {
        const res = await axios.post(UPDATE_ROLE, {
            _id: id,
            ...params, // Spread the params object into the request
        });

        if (res) {
            callback(null, res);
        }
    } catch (error) {
        console.log("Unable to update role", error);
        callback(error, null);
    }
}

export default updateRole_api;