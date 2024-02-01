import { EXPORT_CSV } from "../../resources/urls/admin";
import axios from "../../Interceptor";

async function exportCsv_api( callback) {
    try {


        const res = await axios.get(EXPORT_CSV)

        if (res) {
            callback(null, res);
        }

    } catch (error) {
        console.log("Unable to download ticket", error);
        callback(error, null);
    }

}

export default exportCsv_api;