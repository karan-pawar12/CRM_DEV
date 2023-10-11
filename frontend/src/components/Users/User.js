import React from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import UserTable from "./UserTable";
import CreateUser from "./CreateUser";
import UserDetails from "./UserDetails";


function User() {
  const query = useQuery();
  console.log("id from query:", query.get("id"));

  return <>
    <div hidden={query.get("id") === "" || !query.get("id") ? false : true}>
      <UserTable />
    </div>

    {(query.get("id") === "new") ? <CreateUser /> : (query.get("id") !== null && query.get("id") !== "") && <UserDetails />}

  </>

}

export default User;

export function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}