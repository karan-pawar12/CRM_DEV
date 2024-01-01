import React,{useState,useEffect,useRef} from "react";
import { useLocation } from 'react-router-dom';
import RoleTable from "./RoleTable";
import CreateRole from "./CreateRole";
import RoleDetails from "./RoleDetails";
import getAllRole_api from "../../api_strings/admin/getAllRole_api";


function Role() {
  const [roles, setRoles] = useState([]);
  const [count,settotalCount] = useState(1)
  const query = useQuery();
  const skip = useRef(0);
  const limit = useRef(10);


  useEffect(() => {
    getAllRole();
  }, [])

  function getAllRole() {
    getAllRole_api({skip:skip.current,limit:limit.current},(error, res) => {
      if (error) {
        console.log("Error:", error);
      }
      else {
        setRoles(res.data.roles);
        settotalCount(res.data.totalCount);

      }
    })
  }

  function onPageChange(pageNumber){
    skip.current = (pageNumber-1) * limit.current;
    getAllRole();
  }

  function onCreateSuccess(newlyCreatedData){
    setRoles(old=>[newlyCreatedData,...old]);
  }

  function onUpdateSuccess(data){
    setRoles(old=>{
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
      <RoleTable roles={roles} setRoles={setRoles} onPageChange={onPageChange} count={count} settotalCount={settotalCount}/>
    </div>

    {(query.get("id") === "new") ? <CreateRole  onCreateSuccess={onCreateSuccess}/> : (query.get("id") !== null && query.get("id") !== "") && <RoleDetails onUpdateSuccess={onUpdateSuccess}/>}

  </>

}

export default Role;

export function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}