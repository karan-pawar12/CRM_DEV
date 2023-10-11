import React from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import RoleTable from "./RoleTable";


function Role() {
  const query = useQuery();
  console.log("id from query:", query.get("id"));

  return <>
    <div hidden={query.get("id") === "" || !query.get("id") ? false : true}>
      <RoleTable />
    </div>

    {/* {(query.get("id") === "new") ? <CreateLead /> : (query.get("id") !== null && query.get("id") !== "") && <LeadDetails />} */}

  </>

}

export default Role;

export function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}