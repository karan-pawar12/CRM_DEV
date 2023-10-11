import { ADMIN_SIGNUP } from '../../resources/urls/admin'
import axios from "../../Interceptor";

 async function signup_api(firstName, lastName, email, phone, password, callback) {
  try {
    const res = await axios.post(ADMIN_SIGNUP, {
        firstName, lastName, email, phone, password,
    })
    
    callback(null, res);
  } catch (error) {
    console.error('Login failed:', error);
    callback(error, null)
  }
}

export default signup_api;