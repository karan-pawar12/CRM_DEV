import { ADMIN_SIGNUP } from '../../resources/urls/admin'
import axios from "../../Interceptor";

 async function signup_api({email, phone, password,tenantId}, callback) {
  try {
    const res = await axios.post(ADMIN_SIGNUP, {
       email, phone, password,tenantId
    })
    
    callback(null, res);
  } catch (error) {
    console.error('Login failed:', error);
    callback(error, null)
  }
}

export default signup_api;