import {ADMIN_LOGIN} from '../../resources/urls/admin'
import Axios from 'axios';
export default async function login_api(email,password,callback){
    try {
        const res = await Axios.post(ADMIN_LOGIN,{
          email,
          password,
        })

        const token = res.data.token;
        // if(res.status === 200){
          localStorage.setItem('token', token);
          callback(null,res);
        // }
        

     } catch (error) {
        console.error('Login failed:', error);
        callback(error,null)
     }
}