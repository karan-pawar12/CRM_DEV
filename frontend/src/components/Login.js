import React, { useContext, useState } from 'react';
import { Input, Button } from '@nextui-org/react'
import { Link } from 'react-router-dom';
import login_api from '../api_strings/admin/login_api';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../AuthContext';
import AdminContext from '../AdminContext';
import Forms from './Inputform/Forms';
import Toast from './ToastsContainers/Toast';


function Login() {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const admincontext = useContext(AdminContext);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function onSubmitForm(){
    setFormSubmitted(true);
  }

  function handleLogin(formData) {
    setLoading(true);
    const { email, password, tenantId, } = formData
    login_api(email, password, tenantId, (error, res) => {
      setLoading(false);
      if (error) {
        // alert("Login Failed");
        admincontext.setToast({
          msg: "Login Failed",
          toastType: "error",
          onClose: null
        })
        setFormSubmitted(false);
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
    <>
      {
        admincontext.toast.msg && <Toast {...admincontext.toast} />
      }

      <div className='w-full'>
        <Forms
          formSubmitted={formSubmitted}
          setFormSubmitted={setFormSubmitted}
          fields={[
            {
              name: "email",
              label: "Email",
              type: "Input",
              rules: { required: true, isEmail: true },
              errorMsg: "Please enter valid email"
            },
            {
              name: "password",
              label: "Password",
              type: "Input",
              rules: { min: 8 },
              errorMsg: "Password must be at least 8 characters long"
            },
            {
              name: "tenantId",
              label: "Username",
              type: "Input",
              rules: { required: true },
              errorMsg: "Please enter username"
            }
          ]}
          onSubmit={handleLogin}
          sizeProps={'grid-cols-1'}
        />

        <Button
          type="submit"
          onClick={onSubmitForm}
          isLoading={loading}
          className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Login
        </Button>
      </div>
    </>
  );
}

export default Login;
