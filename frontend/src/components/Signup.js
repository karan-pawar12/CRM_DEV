import React, { useState } from 'react';
import { Input, Button } from '@nextui-org/react';
import { Link } from 'react-router-dom';
import signup_api from '../api_strings/admin/signup_api';
import { useNavigate } from 'react-router-dom';


function Signup() {
  const navigate = useNavigate();
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

  function handleSignup(e) {
    e.preventDefault();
    const { firstName, lastName, email, phone, password } = formData;

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


    signup_api(firstName, lastName, email, phone, password, (error, res) => {
      if (error) {
        alert("Signup Failed");
      }
      else {
        alert("Signup Successfully");
        navigate('/cpanel/login');

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
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-6">Sign Up</h2>
        <form onSubmit={handleSignup}>
          <div className="mb-4">
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
          </div>
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
          <Button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Sign Up
          </Button>
        </form>
        <p className="mt-4 text-gray-600 text-sm text-center">
          Already have an account?{' '}
          <Link to="/cpanel/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
