import { UPDATE_PROJECTTASK } from "../../resources/urls/admin";
import axios from "../../Interceptor";

async function updateProjectTask_api(id,fieldName,fieldValue, callback) {
    try {
        const res = await axios.post(UPDATE_PROJECTTASK, {
            _id:id,fieldName,fieldValue
        });

        if (res) {
            callback(null, res);
        }
    } catch (error) {
        console.log("Unable to update role", error);
        callback(error, null);
    }
}

export default updateProjectTask_api;