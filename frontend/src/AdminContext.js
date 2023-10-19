import { createContext, useState,useRef } from "react";
import axios from "axios";

const AdminContext = createContext({
});

export function AdminContextProvider(props){


    const context = {
    }

    return <AdminContext.Provider value={context}>
        {props.children}
    </AdminContext.Provider>

}

export default AdminContext;