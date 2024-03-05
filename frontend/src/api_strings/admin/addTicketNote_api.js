import { ADD_NOTE } from "../../resources/urls/admin";
import axios from 'axios';

async function addTicketNote_api(formData, callback) {
    try {
        const instance = axios.create({

            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'multipart/form-data'
            }
        });


        const res = await instance.post(ADD_NOTE, formData)

        if (res) {
            callback(null, res)
        }

    } catch (error) {
        console.log("Unable to create role", error);
        callback(error, null);
    }
}

export default addTicketNote_api;