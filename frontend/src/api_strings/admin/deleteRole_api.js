import { DELETE_ROLE } from "../../resources/urls/admin";
import axios from "../../Interceptor";

async function deleteRole_api(roleId, callback) {
    try {

        const softDelete = true;

        const res = await axios.post(DELETE_ROLE, {
            _id: roleId, softDelete
        });

        if (res) {
            callback(null, res);
        }

    } catch (error) {
        console.log("Unable to delete lead", error);
        callback(error, null);
    }

}

export default deleteRole_api;