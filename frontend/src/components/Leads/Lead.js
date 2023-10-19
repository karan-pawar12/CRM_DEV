import React, { useState,useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import LeadTable from "./LeadTable";
import CreateLead from "./CreateLead";
import LeadDetails from "./LeadDetails";
import getAllLead_api from "../../api_strings/admin/getAllLead_api";


function Lead() {
  const query = useQuery();
  const [lead, setLead] = useState([]);

  useEffect(() => {
    getAllLead();
  }, []);

  function getAllLead() {

    getAllLead_api((error, res) => {
      if (error) {
        console.log("Error:", error);
      } else {

        setLead(res.data);


      }
    });
  }

  return <>
    <div hidden={query.get("id") === "" || !query.get("id") ? false : true}>
      <LeadTable lead={lead} setLead={setLead}/>
    </div>

    {(query.get("id") === "new") ? <CreateLead lead={lead} setLead={setLead}/> : (query.get("id") !== null && query.get("id") !== "") && <LeadDetails lead={lead} setLead={setLead}/>}

  </>

}

export default Lead;

export function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}