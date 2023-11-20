import { CREATE_ROLE } from "../../resources/urls/admin";
import axios from '../../Interceptor';

async function CreateRole_api(name,description, callback) {
    try {
        // role name and description add them 
        const res = await axios.post(CREATE_ROLE, {
            name,
            description
        });

        if (res) {
            callback(null, res);
        }

    } catch (error) {
        console.log("Unable to create role", error);
        callback(error, null);
    }
}

export default CreateRole_api;