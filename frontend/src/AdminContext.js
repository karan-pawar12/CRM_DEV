import { createContext, useState,useRef } from "react";
import axios from "axios";

const AdminContext = createContext({
});

function checkedLogged(){
    try{
        if(localStorage.getItem("token"))
        return true;
        else
        return false;
    }catch(e){
        return false;
    }
}

export function AdminContextProvider(props){
    const [lead,setLead] = useState([])
    const [user,setUser] = useState([])
    const [role,setRole] = useState([])
    const [isLogged,setIsLogged] = useState(checkedLogged());
    const httpRequest = useRef(axios);


    const context = {
        lead,setLead,
        user,setUser,
        role,setRole,
        isLogged,setIsLogged,
        httpRequest
    }


    return <AdminContext.Provider value={context}>
        {props.children}
    </AdminContext.Provider>

}

export default AdminContext;