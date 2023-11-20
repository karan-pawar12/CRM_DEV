import { createContext, useState } from "react";

const AuthContext = createContext({
});


export function AuthContextProvider(props) {
    const [auth, setAuth] = useState({
        user: null,
        permissions: [],
    });

    const context = {
        auth,setAuth
    }


    return (
        <AuthContext.Provider value={context}>
            {props.children}
        </AuthContext.Provider>

    )

}

export default AuthContext
