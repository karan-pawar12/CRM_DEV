import React, { useEffect, useState,useRef } from "react";
import { useContext } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import UserTable from "./UserTable";
import CreateUser from "./CreateUser";
import UserDetails from "./UserDetails";
import AuthContext from "../../AuthContext";
import getAllUser_api from "../../api_strings/admin/getAllUser_api";


function User() {
  const [users, setUsers] = useState([]);
  const [count,settotalCount] = useState(1);
  const skip = useRef(0);
  const limit = useRef(10);
  const query = useQuery();
  
  useEffect(() => {
    getAllUser();
  }, []);

  function getAllUser() {

    getAllUser_api({skip:skip.current,limit:limit.current},(error, res) => {
      if (error) {
        console.log("Error:", error);
      } else {
        setUsers(res.data.users);
        settotalCount(res.data.totalCount);
      }
    });
  }

  function onPageChange(pageNumber){
      skip.current = (pageNumber-1) * limit.current;
      getAllUser();
  }

  function onCreateSuccess(newlyCreatedData){
    setUsers(old=>[newlyCreatedData,...old]);
  }

  function onUpdateSuccess(data){
    setUsers(old=>{
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
      <UserTable users={users} setUsers={setUsers} onPageChange={onPageChange} count={count} settotalCount={settotalCount}/>
    </div>

    {(query.get("id") === "new") ? <CreateUser onCreateSuccess={onCreateSuccess}/> : (query.get("id") !== null && query.get("id") !== "") && <UserDetails onUpdateSuccess={onUpdateSuccess}/>}


  </>

}

export default User;

export function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}