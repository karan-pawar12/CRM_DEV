import React from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import RoleTable from "./RoleTable";
import CreateRole from "./CreateRole";
import RoleDetails from "./RoleDetails";


function Role() {
  const query = useQuery();
  console.log("id from query:", query.get("id"));

  return <>
    <div hidden={query.get("id") === "" || !query.get("id") ? false : true}>
      <RoleTable />
    </div>

    {(query.get("id") === "new") ? <CreateRole /> : (query.get("id") !== null && query.get("id") !== "") && <RoleDetails />}

  </>

}

export default Role;

export function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}