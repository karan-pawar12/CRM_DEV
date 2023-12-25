import {DATE_UPDATE} from '../../resources/urls/admin';
import axios from '../../Interceptor';

async function dateUpdate_api(id,start,end,callback) {
    try {
        
        // Define the query parameters as an object


        const res = await axios.post(DATE_UPDATE,{
            _id:id,start,end
        });

        if (res) {
            callback(null, res);
        }
    } catch (error) {
        console.log("Unable to update date", error);
        callback(error, null);
    }
}

export default dateUpdate_api;