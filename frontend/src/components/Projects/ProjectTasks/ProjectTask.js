import React, { useState, useEffect, useRef } from "react";
import ProjectTaskTable from "./ProjectTaskTable";
import CreateProjectTask from "./CreateProjectTask";
import ProjectTaskDetails from "./ProjectTaskDetails";
import getAllProjectTask_api from "../../../api_strings/admin/getAllProjectTask_api"


export default function ProjectTask({id}) {
    const [activeTab,setActiveTab] = useState('')
    const [projectTasks, setProjectTasks] = useState([]);
    const [open,setOpen] = useState(false);
    const [projectTaskId,setprojectTaskId] = useState('');
    const [count,settotalCount] = useState(0);
    const [filter, setFilter] = useState({
      searchQuery: undefined,
    });
    const skip = useRef(0);
    const limit = useRef(10);

    useEffect(() => {
      getProjectTask();
    }, [filter])
    
      function onPageChange(pageNumber){
        skip.current = (pageNumber-1) * limit.current;
        getProjectTask();
      }

      function getProjectTask() {
        getAllProjectTask_api(id,{skip:skip.current,limit:limit.current,searchQuery: filter.searchQuery},(error, res) => {
          if (error) {
            console.log("Error:", error);
          }
          else {
            setProjectTasks(res.data.projectTasks);
            settotalCount(res.data.totalCount);
    
          }
        })
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

    const onOpenModal = () => {
      setOpen(true);
    }
      
     const onCloseModal = () => {
        setOpen(false);
        setActiveTab('');
     }


    return (
        <>
            <div hidden={activeTab === 'newTask'} >
                <ProjectTaskTable  projectTasks={projectTasks} setProjectTasks={setProjectTasks} onPageChange={onPageChange} count={count} settotalCount={settotalCount} setActiveTab={setActiveTab} onOpenModal={onOpenModal} setprojectTaskId={setprojectTaskId} filter={filter} setFilter={setFilter}/>
            </div>

            {(activeTab=== "newTask") ? <CreateProjectTask open={open} onCloseModal={onCloseModal} onCreateSuccess={onCreateSuccess}/> : (activeTab === 'taskDetails') && <ProjectTaskDetails onUpdateSuccess={onUpdateSuccess} projectTaskId={projectTaskId} open={open} onCloseModal={onCloseModal}/> }

        </>
    )
}