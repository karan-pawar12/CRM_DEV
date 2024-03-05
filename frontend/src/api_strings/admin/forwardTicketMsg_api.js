import { Forward_TICKET } from "../../resources/urls/admin";
import axios from 'axios';

async function forwardTicketMsg_api(formData, callback) {
    try {
        const instance = axios.create({

            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'multipart/form-data'
            }
        });


        const res = await instance.post(Forward_TICKET, formData)

        if (res) {
            callback(null, res)
        }

    } catch (error) {
        console.log("Unable to create role", error);
        callback(error, null);
    }
}

export default forwardTicketMsg_api;