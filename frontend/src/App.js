import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './components/Login';
import Signup from './components/Signup';
import Sidebar from './components/Sidebar';
import Layout from './components/Layout';
import Lead from './components/Leads/Lead';
import AddLead from './components/Leads/AddLead';
import Tasks from './components/Tasks/Task';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
            <Route path="leads" element={ <Lead /> } />
            <Route path="add-leads" element={<AddLead />} />
            <Route path="tasks" element={<Tasks />} />
        </Route>

        
        

        <Route exact path={"/login"} element={<Login />} />
        <Route exact path={"/signup"} element={<Signup />} />

      </Routes>

    </BrowserRouter>
  )
}

export default App;