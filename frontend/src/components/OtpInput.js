import React, { useState } from 'react';
import { Button, Input } from "@nextui-org/react";
import verifyOtp_api from '../api_strings/admin/verifyOtp_api';
import resendOtp_api from '../api_strings/admin/resendOtp_api';


export default function OtpInput({ email, tenantId,onOtpSuccess }) {
  const [otp, setOtp] = useState('');

  const handleOtpChange = (e) => {
    const value = e.target.value;

    // Ensure the entered value is numeric and limit it to 6 characters
    if (/^\d*$/.test(value) && value.length <= 6) {
      setOtp(value);
    }
  };

  const handleSubmit = () => {
    // You can perform actions here, such as verifying the OTP
    verifyOtp_api(email, tenantId, otp, (error, res) => {
      if (error) {
        alert('Wrong email or otp');
      }
      else {
        onOtpSuccess('Login');
        alert('Otp verified successfully');
      }
    })
  };

  const handleResend = () => {
    resendOtp_api(email, tenantId, (error, res) => {
      if (error) {
        alert('Wrong email');
      }
      else {
        alert('New Otp generated successfully');
      }
    })
  }

  return (
    <>
   
        <div className="mb-4">
          <Input type="text" label="OTP" placeholder="Enter otp" value={otp} onChange={handleOtpChange} />
        </div>
        <div className='flex space-x-4'>
          <Button type="primary" onClick={handleResend}  className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">
            Resend Otp
          </Button>
          <Button type="primary" onClick={handleSubmit}  className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">
            Submit
          </Button>
        </div>
 

    </>
  );
}