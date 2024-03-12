import { useEffect, useContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './components/Login';
import Signup from './components/Signup';
import Entry from './components/Entry';
import Layout from './components/Layout';
import { AdminContextProvider } from './AdminContext';
import { AuthContextProvider } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import permissions_api from './api_strings/admin/permissions_api';
import AuthContext from './AuthContext';
import Cookies from 'js-cookie';

import { io } from "socket.io-client";



function App() {



  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Main />
      </AuthContextProvider>
    </BrowserRouter>
  )
}

export default App;

function Main() {


  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  useEffect(() => {

    //Establishing socket instance
    const socket = io("ws://localhost:5000", {
  reconnectionDelayMax: 10000,
  auth: {
    token: "123"
  },
  query: {
    "my-key": "my-value"
  }
});



    const token = Cookies.get('token');
    if (token) {
      permissions_api((error, res) => {
        if (error) {
          console.log(error);
        } else {
          const { roleName, permissions } = res.data;
          authContext.setAuth({
            user: roleName,
            permissions: permissions,
          });
          navigate('/cpanel/dashboard');
        }
      })
    } else {
      navigate('/cpanel/entry');
    }
  }, [])

  return (
    <>
      <Routes>
        {/* <Route path="/cpanel/:module" element={<AdminContextProvider><Layout /></AdminContextProvider>}>
          <Route path={':id'} element={<AdminContextProvider><Layout /></AdminContextProvider>} >
            <Route path={':submodule'} />
          </Route>
        </Route> */}
        <Route path="/cpanel/:module" element={<AdminContextProvider><Layout /></AdminContextProvider>}>
          <Route path={':id'} element={<AdminContextProvider><Layout /></AdminContextProvider>}></Route>

        </Route>
        <Route path="/cpanel/entry" element={<AdminContextProvider><Entry /></AdminContextProvider>} />
      </Routes>
    </>
  )
}