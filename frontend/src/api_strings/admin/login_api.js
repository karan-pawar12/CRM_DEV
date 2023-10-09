import { ADMIN_LOGIN } from '../../resources/urls/admin'

import axios from 'axios';
export default async function login_api(email, password, callback) {
  try {
    const res = await axios.post(ADMIN_LOGIN, {
      email,
      password,
    })

    const token = res.data.token;
    localStorage.setItem('token', token);
    
    callback(null, res);
  } catch (error) {
    console.error('Login failed:', error);
    callback(error, null)
  }
}