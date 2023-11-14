import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link } from "@nextui-org/react";
import verifyOtp_api from '../api_strings/admin/verifyOtp_api';
import resendOtp_api from '../api_strings/admin/resendOtp_api';
import { useNavigate } from 'react-router-dom';

export default function OtpInput({email,tenantId,open,setOtpModalOpen}) {
  const navigate = useNavigate();
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
    verifyOtp_api(email,tenantId,otp,(error,res) => {
        if(error){
          alert('Wrong email or otp');
        }
        else{
          alert('Otp verified successfully');
          // navigate('/cpanel/login');
        } 
    })
  };

  const handleResend = () => {
    resendOtp_api(email,tenantId,(error,res) => {
      if(error){
        alert('Wrong email');
      }
      else{
        alert('New Otp generated successfully');
      } 
    })
  }

  return (
    <>
      <Modal
        isOpen={open}
        onOpenChange={(isOpen) => { if (!isOpen) setOtpModalOpen(!open) }}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Enter Otp</ModalHeader>
              <ModalBody>
                <Input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={handleOtpChange}
                />

              </ModalBody>
              <ModalFooter>
              <Button type="primary" onClick={handleResend}>
                  Resend Otp
                </Button>
                <Button type="primary" onClick={handleSubmit}>
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}


{/* 
 */}
