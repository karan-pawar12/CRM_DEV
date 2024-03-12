import { ADMIN_LOGIN } from '../../resources/urls/admin'
import axios from "../../Interceptor";
import Cookies from'js-cookie';

async function login_api(email, password,tenantId, callback) {
  try {
    const res = await axios.post(ADMIN_LOGIN, {
      email,
      password,
      tenantId
    })

    const token = res.data.token;
    Cookies.set('token', token, { expires: 7, secure: true });
    
    callback(null, res);
  } catch (error) {
    console.error('Login failed:', error);
    callback(error, null)
  }
}

export default login_api;