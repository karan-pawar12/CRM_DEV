import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import UserTable from "./UserTable";
import CreateUser from "./CreateUser";
import UserDetails from "./UserDetails";
import AuthContext from "../../AuthContext";
import getAllUser_api from "../../api_strings/admin/getAllUser_api";


function User() {
  const [user, setUser] = useState([])
  const query = useQuery();
  
  useEffect(() => {
    getAllUser();
  }, []);

  function getAllUser() {

    getAllUser_api((error, res) => {
      if (error) {
        console.log("Error:", error);
      } else {

        setUser(res.data);

      }
    });
  }


  return <>
    <div hidden={query.get("id") === "" || !query.get("id") ? false : true}>
      <UserTable user={user} setUser={setUser} />
    </div>

    {(query.get("id") === "new") ? <CreateUser user={user} setUser={setUser} /> : (query.get("id") !== null && query.get("id") !== "") && <UserDetails user={user} setUser={setUser} />}


  </>

}

export default User;

export function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}