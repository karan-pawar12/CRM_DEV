import Login from "./Login";
import OtpInput from "./OtpInput";
import Signup from "./Signup";
import { Tabs, Tab } from "@nextui-org/react";
import { useState } from 'react';

export default function Entry() {

    const [page, setPage] = useState('Login');
    const [otpData, setOtpData] = useState({
        email: '',
        tenantId: '',
        password: ''
    });

    const handlePage = (key) => {
        setPage(key);
    };

    const handleOtpInput = (email, tenantId, password) => {
        setOtpData({
            email,
            tenantId,
            password
        });
        setPage('OTP');
    };

    return <div className="min-h-screen min-w-screen bg-white sm:bg-gray-50">
        <div className="flex justify-center pt-12">
            <div className="bg-white p-8 rounded-lg  h-full w-full  sm:w-96 sm:shadow-md">
                <h2 className="text-center text-2xl font-bold mb-6">{page}</h2>
                {
                    page !== 'OTP' && (
                        <Tabs selectedKey={page} onSelectionChange={(key) => setPage(key)} aria-label="Options" color="primary" fullWidth size="lg">



                            <Tab key="Login" title={<strong>Login</strong>}>
                                <Login handlePage={handleOtpInput} />
                            </Tab>
                            <Tab key="Register" title={<strong>Register</strong>}>
                                <Signup onSignupSuccess={handleOtpInput} />
                            </Tab>



                        </Tabs>
                    )
                }

                {
                    page === "OTP" && (
                        <OtpInput
                            email={otpData.email}
                            tenantId={otpData.tenantId}
                            password={otpData.password}
                            onOtpSuccess={() => setPage('Login')}
                        />
                    )
                }

            </div>

        </div>
    </div>
}