import React,{useState,useEffect} from "react";
import { useLocation } from 'react-router-dom';
import RoleTable from "./RoleTable";
import CreateRole from "./CreateRole";
import RoleDetails from "./RoleDetails";
import getAllRole_api from "../../api_strings/admin/getAllRole";


function Role() {
  const [role, setRole] = useState([]);
  const query = useQuery();


  useEffect(() => {
    getAllRole();
  }, [])

  function getAllRole() {
    getAllRole_api((error, res) => {
      if (error) {
        console.log("Error:", error);
      }
      else {
        setRole(res.data);
      }
    })
  }

  return <>
    <div hidden={query.get("id") === "" || !query.get("id") ? false : true}>
      <RoleTable role={role} setRole={setRole}/>
    </div>

    {(query.get("id") === "new") ? <CreateRole role={role} setRole={setRole}/> : (query.get("id") !== null && query.get("id") !== "") && <RoleDetails role={role} setRole={setRole}/>}

  </>

}

export default Role;

export function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}