import React,{useState,useEffect,useRef} from "react";
import { useLocation } from 'react-router-dom';
import TaskTable from "./TaskTable";
import CreateTask from "./CreateTask";
import TaskDetails from "./TaskDetails";
import getAllTask_api from "../../api_strings/admin/getAllTask_api";



function Task() {
  const [tasks, setTasks] = useState([]);
  const [count,settotalCount] = useState(0)
  const query = useQuery();
  const skip = useRef(0);
  const limit = useRef(10);


  useEffect(() => {
    getAllTask();
  }, [])

  function getAllTask() {
    getAllTask_api({skip:skip.current,limit:limit.current},(error, res) => {
      if (error) {
        console.log("Error:", error);
      }
      else {
        setTasks(res.data.roles);
        settotalCount(res.data.totalCount);

      }
    })
  }

  function onPageChange(pageNumber){
    skip.current = (pageNumber-1) * limit.current;
    getAllTask();
  }

  function onCreateSuccess(newlyCreatedData){
    setTasks(old=>[newlyCreatedData,...old]);
  }

  function onUpdateSuccess(data){
    setTasks(old=>{
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
      <TaskTable tasks={tasks} setTasks={setTasks} onPageChange={onPageChange} count={count} settotalCount={settotalCount}/>
    </div>

    {(query.get("id") === "new") ? <CreateTask  onCreateSuccess={onCreateSuccess}/> : (query.get("id") !== null && query.get("id") !== "") && <TaskDetails onUpdateSuccess={onUpdateSuccess}/>}

  </>

}

export default Task;

export function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}