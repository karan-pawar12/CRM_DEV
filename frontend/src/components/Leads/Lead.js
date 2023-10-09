import React from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import LeadTable from "./LeadTable";
import CreateLead from "./CreateLead";


function Lead() {
  const query = useQuery();
  console.log("id from query:", query.get("id"));

  return <>
    <div hidden={query.get("id") === "" || !query.get("id") ? false : true}>
      <LeadTable />
    </div>

    {(query.get("id") === "new" ) ?  <CreateLead /> : "" }

  </>

}

export default Lead;

export function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}