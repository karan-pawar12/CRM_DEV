import React, { useState,useContext } from 'react';
import { Input, Button } from '@nextui-org/react';
import signup_api from '../api_strings/admin/signup_api';
import Forms from './Inputform/Forms';
import Toast from './ToastsContainers/Toast';
import AdminContext from '../AdminContext';



function Signup({ onSignupSuccess }) {
  const admincontext = useContext(AdminContext);
  const [formSubmitted, setFormSubmitted] = useState(false);

  function onSubmitForm() {
    setFormSubmitted(true);
  }

  function handleSignup(formData) {
    const { email, phone, password, tenantId } = formData;
    signup_api({ email, phone, password, tenantId }, (error, res) => {
      if (error) {
        admincontext.setToast({
          msg: "Unable to sign up",
          toastType: "error",
          onClose: null
        })
        setFormSubmitted(false);
      }
      else {
        onSignupSuccess(email,tenantId,password);

      }
    })


  }




  return (
    <>
      <div className='w-full'>
        {
          admincontext.toast.msg && <Toast {...admincontext.toast} />
        }

        <Forms
          formSubmitted={formSubmitted}
          setFormSubmitted={setFormSubmitted}
          fields={[
            {
              name: "email",
              label: "Email",
              type: "Input",
              rules: { required: true, isEmail: true },
              inputType: "email",
              errorMsg: "Please enter valid email"
            },
            {
              name: "phone",
              label: "Phone",
              type: "Input",
              inputType: "tel",
              rules: { required: true, isPhone: true },
              errorMsg: "Please enter valid phone"
            },
            {
              name: "password",
              label: "Password",
              type: "Input",
              rules: { min: 8 },
              inputType: "password",
              errorMsg: "Password must be at least 8 characters long"
            },
            {
              name: "tenantId",
              label: "Username",
              type: "Input",
              rules: { required: true },
              inputType: "text",
              errorMsg: "Please enter username"
            }
          ]}
          onSubmit={handleSignup}
          sizeProps={'grid-cols-1'}
        />

        <Button
          type="submit"
          onClick={onSubmitForm}
          className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Sign Up
        </Button>
      </div>


    </>
  );
}

export default Signup;
