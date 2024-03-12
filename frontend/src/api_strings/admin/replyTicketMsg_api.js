import { REPLY_TICKET } from "../../resources/urls/admin";
import axios from 'axios';
import Cookies from 'js-cookie';

async function replyTicketMsg_api(formData, callback) {
    try {
        const instance = axios.create({

            headers: {
                'Authorization': 'Bearer ' + Cookies.get('token'),
                'Content-Type': 'multipart/form-data'
            }
        });


        const res = await instance.post(REPLY_TICKET, formData)

        if (res) {
            callback(null, res)
        }

    } catch (error) {
        console.log("Unable to create role", error);
        callback(error, null);
    }
}

export default replyTicketMsg_api;