import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './components/Login';
import Signup from './components/Signup';
import Sidebar from './components/Sidebar';
import Layout from './components/Layout';
import { AdminContextProvider } from './AdminContext';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/cpanel/:module" element={<AdminContextProvider><Layout /></AdminContextProvider>}></Route>

        
        

        <Route exact path={"/cpanel/login"} element={<Login />} />
        <Route exact path={"/cpanel/signup"} element={<Signup />} />

      </Routes>

    </BrowserRouter>
  )
}

export default App;