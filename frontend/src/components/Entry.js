import Login from "./Login";
import Signup from "./Signup";
import { Tabs,Tab } from "@nextui-org/react";
import {useState} from 'react';

export default function Entry(){

    const [page,setPage] = useState('Login');
    const [isOtpSubmitted,setIsOtpSubmitted] = useState(false);

    return <div className="min-h-screen min-w-screen bg-white sm:bg-gray-50">

       <div className="flex justify-center pt-12">
       <div className="bg-white p-8 rounded-lg  h-full w-full  sm:w-96 sm:shadow-md">
       <h2 className="text-center text-2xl font-bold mb-6">{page}</h2>
       <Tabs onSelectionChange={(key)=>setPage(key)} aria-label="Options" color="primary" fullWidth size="lg">
        <Tab key="Login" title={<strong>Login</strong>}>
            <Login/>
        </Tab>
        <Tab key="Register" title={<strong>Register</strong>}>
            <Signup/>
        </Tab>
        </Tabs>
       </div>


        </div>

    </div>
}