import React, { useContext, useState } from 'react';
import { Input, Button } from '@nextui-org/react'
import { Link } from 'react-router-dom';
import login_api from '../api_strings/admin/login_api';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../AuthContext';


function Login() {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleLogin(e) {
    e.preventDefault();
    login_api(email, password, (error, res) => {
      if (error) {
        alert("Login Failed");
      }
      else {
        const { role, permissions } = res.data;
        authContext.setAuth({
          user: role,
          permissions: permissions,
        });

        navigate('/cpanel/dashboard');
        alert("Login Successfully");
      }
    })
  }

  return (

    

      <form className='w-full' onSubmit={handleLogin}>
        <div className="mb-4">
          <Input size='sm'
            type="email" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="mb-4">
          <Input size='sm'
            type="password" label="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
       <div>
        <Link to="/forgotPassword" className="text-small text-blue-500 hover:underline">
          Forgot Password?
        </Link>
       </div>
       <br/>
        <Button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Login
        </Button>
      </form>

    

  );
}

export default Login;
