import React, { useState } from 'react';
import { Input, Button } from '@nextui-org/react';
import { Link } from 'react-router-dom';
import signup_api from '../api_strings/admin/signup_api';
import { useNavigate } from 'react-router-dom';
import OtpInput from './OtpInput';


function Signup() {
  const navigate = useNavigate();
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
    tenantId: ''
  });
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  function handleSignup(e) {
    e.preventDefault();
    const { email, phone, password, tenantId } = formData;

    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      return;
    } else {
      setPasswordError('');
    }

    if (!isEmailValid(email)) {
      setEmailError('Please enter a valid email address');
      return;
    } else {
      setEmailError('');
    }

    if (!isNumeric(phone)) {
      setPhoneError('Phone number must contain only numbers');
      return;
    } else {
      setPhoneError('');
    }

    const toggleOtpModal = () => {
      setOtpModalOpen(!otpModalOpen);
    };


    signup_api( {email, phone, password,tenantId}, (error, res) => {
      if (error) {
        alert("Signup Failed");
      }
      else {
        alert("Signup Successfully");
        toggleOtpModal();

      }
    })


  }

  function handleInputChange(e) {
    const { name, value } = e.target;

    // Update the formData object with the new input value
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function isEmailValid(email) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }

  function isNumeric(input) {
    return /^\d+$/.test(input);
  }

  


  return (
    <>
        <form onSubmit={handleSignup}>
          {/* <div className="mb-4">
            <Input
              type="text"
              label="First Name"
              placeholder="Enter your first Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <Input
              type="text"
              label="Last Name"
              placeholder="Enter your last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </div> */}
          <div className="mb-4">
            <Input
              type="text"
              label="Email"
              placeholder="Enter your email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              isInvalid={emailError !== ''}
              errorMessage={emailError}
            />
          </div>
          <div className="mb-4">
            <Input
              type="phone"
              label="Phone"
              placeholder="Enter your phone no"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              isInvalid={phoneError !== ''}
              errorMessage={phoneError}
            />
          </div>
          <div className="mb-4">
            <Input
              type="password"
              label="Password"
              placeholder="Enter your password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              isInvalid={passwordError !== ""}
              errorMessage={passwordError}
            />
          </div>
          <div className="mb-4">
            <Input
              type="text"
              label="Username"
              placeholder="Enter your company's username"
              name="tenantId"
              value={formData.tenantId}
              onChange={handleInputChange}
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Sign Up
          </Button>
        </form>

      <OtpInput email={formData.email} tenantId={formData.tenantId} open={otpModalOpen}  setOtpModalOpen={setOtpModalOpen}/>
      </>
  );
}

export default Signup;
