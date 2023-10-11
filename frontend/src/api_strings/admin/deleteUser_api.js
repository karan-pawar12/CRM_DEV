import { DELETE_USER } from "../../resources/urls/admin";
import axios from "../../Interceptor";

async function deleteUser_api(userId, callback) {
    try {
         
        console.log(userId);
        const softDelete = true;

        const res = await axios.post(DELETE_USER, {
            _id: userId, softDelete
        });

        if (res) {
            callback(null, res);
        }

    } catch (error) {
        console.log("Unable to delete lead", error);
        callback(error, null);
    }

}

export default deleteUser_api;