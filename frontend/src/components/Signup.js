import React from 'react';
import { Input,Button } from '@nextui-org/react';
import { Link } from 'react-router-dom';

function Signup() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-6">Sign Up</h2>
        <form>
          <div className="mb-4">
            <Input type='text' label="First Name" placeholder='Enter your first Name' />
          </div>
          <div className="mb-4">
            <Input type='text' label="Last Name" placeholder='Enter your last Name' />
          </div>
          <div className="mb-4">
            <Input type='text' label="Email" placeholder='Enter your email'/>
          </div>
          <div className="mb-4">
            <Input type="phone" label="Phone" placeholder='Enter your phone no' />
          </div>
          <div className="mb-4">
            <Input type='password' label="Password" placeholder='Enter your password' />
          </div>
          <Button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Sign Up
          </Button>
        </form>
        <p className="mt-4 text-gray-600 text-sm text-center">
          Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
