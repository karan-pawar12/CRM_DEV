import React, { useState,useEffect, useRef } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import LeadTable from "./LeadTable";
import CreateLead from "./CreateLead";
import LeadDetails from "./LeadDetails";
import getAllLead_api from "../../api_strings/admin/getAllLead_api";


function Lead() {
  const query = useQuery();
  const [leads, setLeads] = useState([]);
  const [count,settotalCount] = useState(1)
  const skip = useRef(0);
  const limit = useRef(10);


  useEffect(() => {
    getAllLead();
  }, []);

  function getAllLead() {

    getAllLead_api({skip:skip.current,limit:limit.current},(error, res) => {
      if (error) {
        console.log("Error:", error);
      } else {

        setLeads(res.data.leads);
        settotalCount(res.data.totalCount);

      }
    });
  }

  function onPageChange(pageNumber){
    skip.current = (pageNumber-1) * limit.current;
    getAllLead();
  }


  function onCreateSuccess(newlyCreatedData){
    setLeads(old=>[newlyCreatedData,...old]);
  }

  function onUpdateSuccess(data){
    setLeads(old=>{
      let temp = JSON.parse(JSON.stringify(old));
      for(let i=0;i<temp.length;i++){
          if(data._id==temp[i]._id){
            temp[i] = data;
            break;
          }
      }
      return temp;

    });
  }

  return <>
    <div hidden={query.get("id") === "" || !query.get("id") ? false : true}>
      <LeadTable onPageChange={onPageChange} leads={leads} setLeads={setLeads} count={count} settotalCount={settotalCount}/>
    </div>

    {(query.get("id") === "new") ? <CreateLead onCreateSuccess={onCreateSuccess} /> : (query.get("id") !== null && query.get("id") !== "") && <LeadDetails onUpdateSuccess={onUpdateSuccess} />}

  </>

}

export default Lead;

export function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}