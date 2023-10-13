import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './components/Login';
import Signup from './components/Signup';
import Sidebar from './components/Sidebar';
import Layout from './components/Layout';
import { AdminContextProvider } from './AdminContext';
import { useNavigate } from 'react-router-dom';

function App() {



  return (
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  )
}

export default App;

function Main() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      navigate('/cpanel/dashboard');
    } else {
      navigate('/cpanel/login');
    }
  }, [])
  return (
    <>
      <Routes>
        <Route path="/cpanel/:module" element={<AdminContextProvider><Layout /></AdminContextProvider>}></Route>




        <Route exact path={"/cpanel/login"} element={<Login />} />
        <Route exact path={"/cpanel/signup"} element={<Signup />} />

      </Routes>

    </>
  )
}