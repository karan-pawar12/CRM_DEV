import React, { useState, useEffect, useRef } from "react";
import { Button } from "@nextui-org/react";
import { useLocation, useParams } from 'react-router-dom';
import ProjectTaskTable from "./ProjectTaskTable";
import CreateProjectTask from "./CreateProjectTask";
import ProjectTaskDetails from "./ProjectTaskDetails";


export default function ProjectTask() {
    const [projectTasks, setProjectTasks] = useState([]);
    const [count,settotalCount] = useState(0);
    const {id,subModule} = useParams();
    const skip = useRef(0);
    const limit = useRef(10);

    console.log(subModule,"I am subModule")

    useEffect(() => {
        getProjectTask();
      }, [])
    
      function getProjectTask() {
        // getProjectTask_api({skip:skip.current,limit:limit.current},(error, res) => {
        //   if (error) {
        //     console.log("Error:", error);
        //   }
        //   else {
        //     setTasks(res.data.tasks);
        //     settotalCount(res.data.totalCount);
    
        //   }
        // })
      }
    
      function onPageChange(pageNumber){
        skip.current = (pageNumber-1) * limit.current;
        getProjectTask();
      }
    
      function onCreateSuccess(newlyCreatedData){
        setProjectTasks(old=>[newlyCreatedData,...old]);
      }
    
      function onUpdateSuccess(data){
        setProjectTasks(old=>{
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
      

    return (
        <>
            <div hidden={subModule === "" || subModule !== undefined }>
                <ProjectTaskTable  projectTasks={projectTasks} setProjectTasks={setProjectTasks} onPageChange={onPageChange} count={count} settotalCount={settotalCount}/>
            </div>

            {(subModule=== "newTask") ? <CreateProjectTask onCreateSuccess={onCreateSuccess}/> : "" }

        </>
    )
}

export function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
}