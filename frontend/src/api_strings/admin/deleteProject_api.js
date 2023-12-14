import { DELETE_PROJECT } from "../../resources/urls/admin";
import axios from "../../Interceptor";

async function deleteProject_api(projectId, callback) {
    try {
         
        const softDelete = true;

        const res = await axios.post(DELETE_PROJECT, {
            _id: projectId, softDelete
        });

        if (res) {
            callback(null, res);
        }

    } catch (error) {
        console.log("Unable to delete project", error);
        callback(error, null);
    }

}

export default deleteProject_api;