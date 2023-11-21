import Login from "./Login";
import OtpInput from "./OtpInput";
import Signup from "./Signup";
import { Tabs,Tab } from "@nextui-org/react";
import {useState} from 'react';

export default function Entry(){

    const [page,setPage] = useState('Login');
    const [otpData, setOtpData] = useState({
        email: '',
        tenantId: '',
      });

    const handlePage = (key) => {
        setPage(key);
    };

    const handleOtpInput = (email, tenantId) => {
        setOtpData({
          email,
          tenantId,
        });
        setPage('OTP');
      };

    return <div className="min-h-screen min-w-screen bg-white sm:bg-gray-50">
       <div className="flex justify-center pt-12">
       <div className="bg-white p-8 rounded-lg  h-full w-full  sm:w-96 sm:shadow-md">
       <h2 className="text-center text-2xl font-bold mb-6">{page}</h2>
       <Tabs selectedKey={page} onSelectionChange={(key)=>setPage(key)} aria-label="Options" color="primary" fullWidth size="lg">
        <Tab key="Login" title={<strong>Login</strong>}>
            <Login handlePage={handleOtpInput}/>
        </Tab>
        <Tab key="Register" title={<strong>Register</strong>}>
            <Signup onSignupSuccess={handleOtpInput}/>
        </Tab>
        <Tab key="OTP" title={<strong>OTP</strong>} >
            <OtpInput email={otpData.email} tenantId={otpData.tenantId} onOtpSuccess={handlePage}/>
        </Tab>
        </Tabs>
       </div>
   
        </div>
    </div>
}