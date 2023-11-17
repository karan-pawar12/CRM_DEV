import React, { useState } from 'react';
import { Input, Button } from '@nextui-org/react';
import { Link } from 'react-router-dom';
import signup_api from '../api_strings/admin/signup_api';
import { useNavigate } from 'react-router-dom';
import OtpInput from './OtpInput';
import Forms from './Inputform/Forms';







function Signup() {
  const navigate = useNavigate();
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [formSubmitted,setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
  });
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');


  function onSubmitForm(){
    setFormSubmitted(true);
  }

  function handleSignup({firstName, lastName, email, phone, password}) {
  
   

    signup_api(firstName, lastName, email, phone, password, (error, res) => {
      if (error) {
        alert("Signup Failed");
        setFormSubmitted(false);
      }
      else {
        alert("Signup Successfully");
        //toggleOtpModal();
        // navigate('/cpanel/login');

      }
    })


  }





  return (
    <div className='w-full'>
     


        <Forms
        formSubmitted={formSubmitted}
        setFormSubmitted={setFormSubmitted}
             fields={[
              {
                name: "firstName",
                label: "First Name",
                type: "Input",
                rules:{required:true,isName:true},
                errorMsg:"Please enter valid first Name"
              },
              {
                name: "lastName",
                label: "Last Name",
                type: "Input",
                rules:{required:true,isName:true},
                errorMsg:"Please enter valid last Name"
              },
              {
                name: "email",
                label: "Email",
                type: "Input",
               
                rules:{required:true, isEmail:true},
                errorMsg:"Please enter valid email"
              },
              {
                name: "phone",
                label: "Phone",
                type: "Input",
                
                rules:{required:true,isPhone:true},
                errorMsg:"Please enter valid phone"
              },
              {
                name: "password",
                label: "Password",
                type: "Input",
                rules:{required:true},
                errorMsg:"Please enter valid password"
              }
             ]}
             onSubmit={handleSignup}
             sizeProps={'grid-cols-1'}
            />
           

         
          <Button
          onClick={onSubmitForm}
            className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Sign Up
          </Button>

     

      <OtpInput email={formData.email} open={otpModalOpen} setOtpModalOpen={setOtpModalOpen} />
    </div>
  );
}

export default Signup;
