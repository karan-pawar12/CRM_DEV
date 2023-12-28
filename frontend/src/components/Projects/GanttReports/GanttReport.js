import { Gantt, Task, ViewMode } from "gantt-task-react";
import { useEffect, useState } from "react";
import getGanttReport_api from "../../../api_strings/admin/getGanttReportData_api";
import ViewSwitcher from "./ViewSwitcher";
import dateUpdate_api from "../../../api_strings/admin/dateUpdate_api";
import GanttModal from "./GanttModal";
import moment from 'moment'



export default function GanttReport({ id }) {
    const [view, setView] = useState(ViewMode.Day);
    const [tasks, setTasks] = useState('');
    const [isChecked, setIsChecked] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [projectTaskId,setprojectTaskId] = useState('')


    async function getGanttReportData() {
        await getGanttReport_api(id, (error, res) => {
            if (error) {
                console.log("Error:", error);
            }
            else {

                const transformedTasks = res.data.map(task => ({
                    id: task._id,
                    start: new Date(task.start),
                    end: new Date(task.end),
                    name: task.name,
                    type: 'task',
                    dependencies: task.dependencies
                    // Add other properties as needed
                }));



                setTasks(transformedTasks);



            }
        })
    }

    useEffect(() => {
        getGanttReportData();
    }, []);


    const handleTaskChange = (task) => {
        let { start, end, id } = task
        console.log(start,end);
        dateUpdate_api(id, start, end, (error, res) => {
            if (error) {
                console.log("Error:", error);
            } else {

                res.data.start = new Date(res.data.start);
                res.data.end = new Date(res.data.end);
                setTasks(old => {
                    let temp = JSON.parse(JSON.stringify(old));
                    for (let i = 0; i < temp.length; i++) {
                        if (res.data._id == temp[i]._id) {
                            temp[i] = res.data;
                            break;
                        }
                    }
                    return temp;

                });

            }
        })




    }

    const openModal = (task) => {
        setIsModalOpen(true);
        setprojectTaskId(task.id);
    };

    // Function to close the modal
    const closeModal = () => {
        setIsModalOpen(false);
        setprojectTaskId(null);
    };

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




    return (
        <div className="w-full flex-row">
            <div className="flex-1 overflow-scroll">
                <ViewSwitcher
                    onViewModeChange={(viewMode) => setView(viewMode)}
                    onViewListChange={setIsChecked}
                    isChecked={isChecked}

                />
                {tasks.length > 0 && (
                    <>
                        <Gantt
                            tasks={tasks}
                            viewMode={view}
                            onDateChange={handleTaskChange}
                            listCellWidth={isChecked ? "155px" : ""}
                            onClick={openModal}
                        />
                       { isModalOpen && <GanttModal onUpdateSuccess={onUpdateSuccess} open={isModalOpen} onCloseModal={closeModal} projectTaskId={projectTaskId} /> }
                    </>
                )}
            </div>
        </div>
    );
}
