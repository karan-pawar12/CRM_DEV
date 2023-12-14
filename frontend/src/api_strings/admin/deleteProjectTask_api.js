import { DELETE_PROJECTTASK } from "../../resources/urls/admin";
import axios from "../../Interceptor";

async function deleteProjectTask_api(projectTaskId, callback) {
    try {

        const softDelete = true;

        const res = await axios.post(DELETE_PROJECTTASK, {
            _id: projectTaskId, softDelete
        });

        if (res) {
            callback(null, res);
        }

    } catch (error) {
        console.log("Unable to delete project", error);
        callback(error, null);
    }

}

export default deleteProjectTask_api;