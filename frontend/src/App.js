import { useEffect, useContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './components/Login';
import Signup from './components/Signup';
import Sidebar from './components/Sidebar';
import Layout from './components/Layout';
import { AdminContextProvider } from './AdminContext';
import { AuthContextProvider } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import permissions_api from './api_strings/admin/permissions_api';
import AuthContext from './AuthContext';
import Entry from './components/Entry';

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
    const token = localStorage.getItem('token');
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
        }
      })
    } else {
      navigate('/cpanel/login');
    }
  }, [])

  return (
    <>
      <Routes>
        <Route path="/cpanel/:module" element={<AdminContextProvider><Layout /></AdminContextProvider>}></Route>
        <Route path="/cpanel/entry" element={<Entry/>}/>
        <Route exact path={"/cpanel/login"} element={<Login />} />
        <Route exact path={"/cpanel/signup"} element={<Signup />} />
      </Routes>
    </>
  )
}