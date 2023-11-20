import React, { useContext, useState } from 'react';
import { Input, Button } from '@nextui-org/react'
import { Link } from 'react-router-dom';
import login_api from '../api_strings/admin/login_api';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../AuthContext';
import AdminContext from '../AdminContext';
import Toast from './ToastsContainers/Toast';


function Login() {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const admincontext = useContext(AdminContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading,setLoading] = useState(false);

  function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    login_api(email, password, (error, res) => {
      setLoading(false);
      if (error) {
        // alert("Login Failed");
        admincontext.setToast({
          msg:"Login Failed",
          toastType:"error",
          onClose:null
        })
      }
      else {
        const { role,permissions } = res.data;
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
   <>
    {
				admincontext.toast.msg && 	<Toast {...admincontext.toast} />
		}
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-6">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <Input type="email" label="Email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="mb-4">
            <Input type="password" label="Password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <Button
            type="submit"
            isLoading={loading}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Login
          </Button>
        </form>
      </div>
    </div>
    </>
  );
}

export default Login;
