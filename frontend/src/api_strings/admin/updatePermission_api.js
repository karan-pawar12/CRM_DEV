import { UPDATE_PERMISSION } from "../../resources/urls/admin";
import axios from "../../Interceptor";

async function updatePermission_api(id, params, callback) {
    try {
        const res = await axios.post(UPDATE_PERMISSION, {
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

export default updatePermission_api;