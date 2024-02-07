import React,{useState,useEffect,useRef} from "react";
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import ProjectDetails from "./ProjectDetails";
import CreateProject from "./CreateProject";
import getAllProject_api from "../../api_strings/admin/getAllProject_api";
import ProjectTable from "./ProjectTable";



function Project() {
  const [projects, setProjects] = useState([]);
  const [count,settotalCount] = useState(1);
  const [filter, setFilter] = useState({
    searchQuery: undefined,
  });
  const {id} = useParams();
  const skip = useRef(0);
  const limit = useRef(10);

  useEffect(() => {
    getAllProject();
  }, [filter])

  async function getAllProject() {
    await getAllProject_api({skip:skip.current,limit:limit.current,searchQuery: filter.searchQuery},(error, res) => {
      if (error) {
        console.log("Error:", error);
      }
      else {
        setProjects(res.data.projects);
        settotalCount(res.data.totalCount);

      }
    })
  }


  function onPageChange(pageNumber){
    skip.current = (pageNumber-1) * limit.current;
    getAllProject();
  }

  function onCreateSuccess(newlyCreatedData){
    setProjects(old=>[newlyCreatedData,...old]);
  }

  function onUpdateSuccess(data){
    setProjects(old=>{
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

  return <div className="w-full overflow-hidden">
    <div hidden={id === "" || !id ? false : true }>
      <ProjectTable projects={projects} setProjects={setProjects} onPageChange={onPageChange} count={count} settotalCount={settotalCount} filter={filter} setFilter={setFilter}/>
    </div>

    {(id === "new") ? <CreateProject  onCreateSuccess={onCreateSuccess}/> : (id !== null && id !== undefined ) && <ProjectDetails onUpdateSuccess={onUpdateSuccess}/>}

  </div>

}

export default Project;

