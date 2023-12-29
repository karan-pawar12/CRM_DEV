import React, { useCallback, useContext, useState, useEffect,useRef } from "react";
import { useParams } from "react-router-dom";
import { EditIcon, DeleteIcon, EyeIcon } from "../../../resources/icons/icons";
import { Button, Input } from '@nextui-org/react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Tooltip, Pagination } from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';
import AuthContext from "../../../AuthContext";
import AdminContext from "../../../AdminContext";
import getAllProjectTask_api from "../../../api_strings/admin/getAllProjectTask_api";
import deleteProjectTask_api from "../../../api_strings/admin/deleteProjectTask_api";

export default function ProjectTaskTable({projectTasks,setProjectTasks,onPageChange,count,settotalCount,setActiveTab,onOpenModal,setprojectTaskId}) {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchKey, setSearchKey] = useState("");
    const [totalPage,setTotalPage] = useState(1);
    const authContext = useContext(AuthContext);
    const skip = useRef(0);
    const limit = useRef(10);
    const { openConfirmationModal, closeConfirmationModal } = useContext(AdminContext);
    const navigate = useNavigate();

    useEffect(() => {
        calculateTotalPage();
    }, [count]);



    function handleDeleteProjectTaskClick(projectTaskId){
        openConfirmationModal('Are you sure you want to delete this task ?', () => {
            deleteProjectTask_api(projectTaskId, (error, res) => {
                if (error) {
                    console.log("Error:", error);
                } else {

                    setProjectTasks((projectTasks) => projectTasks.filter((projectTask) => projectTask._id !== projectTaskId))
                }
            })
        })
    }

    function calculateTotalPage() {
        let temp = (count / limit.current);
        let isFraction = temp % 1 !== 0;

        if (isFraction) {
            temp = parseInt(temp) + 1;
            setTotalPage(temp);

        } else {
            setTotalPage(temp);
        }


    }

    const handleCreateProjectTask = () => {
        // Use the navigate function to navigate to the new URL
        onOpenModal();
        setActiveTab('newTask');
    };

    function handleProjectTaskDetails(projectTaskId) {
        setprojectTaskId(projectTaskId);
        onOpenModal();
        setActiveTab('taskDetails');
    }

    const renderCell = useCallback((projectTask, columnKey) => {
        switch (columnKey) {
            case "taskName": // Concatenate first name and last name
                return <span>{`${projectTask.taskName}`}</span>;
            case "createdBy":
                return <span>{`${projectTask.createdBy.firstName}`}</span>;
            case "duration":
                return <span>{`${projectTask.duration} Days`}</span>
            case "priority":
                return <span>{projectTask.priority}</span>
            case "projectName":
                return <span>{projectTask.projectName}</span>
            case "actions":
                return (
                    <div className="relative flex items-center gap-3">
                        {authContext.auth.permissions["projecttask"]?.update && <Tooltip content="Details">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <EyeIcon onClick={() => handleProjectTaskDetails(projectTask._id)} />
                            </span>
                        </Tooltip>}
                        {authContext.auth.permissions["projecttask"]?.delete && <Tooltip color="danger" content="Delete project">
                            <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                <DeleteIcon onClick={() => handleDeleteProjectTaskClick(projectTask._id)} />
                            </span>
                        </Tooltip>}
                    </div>
                );
            default:
                return "";
        }
    }, []);

    const columns = [
        { name: "Task", key: "taskName" }, // Use "fullName" column for full name
        { name: "Owner", key: "createdBy" },
        { name: "Duration", key: "duration" },
        { name: "Priority", key: "priority" },
        {name: "Project Name", key:"projectName"},
        { name: "ACTIONS", key: "actions" },
    ];

    const handleSearchQuery = (e) => {
        const currValue = e.target.value;
        setSearchKey(currValue);
        getAllProjectTask_api({skip:skip.current,limit:limit.current,searchQuery:currValue},(error, res) => {
            if (error) {
              console.log("Error:", error);
            } else {
      
              setProjectTasks(res.data.projectTasks);
              settotalCount(res.data.totalCount);
      
            }
          });
    }


// remember to add permission

    
    return (
        <>
            <div className="mt-8 mb-6">
                 <div className='flex justify-between'>  
                    <div>
                        <Input placeholder='Search Project Tasks' className='w-auto' 
                        value={searchKey}
                        onChange={handleSearchQuery}
                        />
                    </div>
                    <div>

                        <Button color='primary' className='mr-4' onClick={handleCreateProjectTask}>
                            Create Project Task
                        </Button>


                        <Button color='primary'>
                            Export to CSV
                        </Button>
                    </div>
                </div>
            </div>
            <Table aria-label="Example static collection table" selectionMode="multiple">
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn key={column.key} align="start">
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody items={projectTasks}>
                    {(projectTask) => (

                        <TableRow key={projectTask._id}>

                            {(columnKey) => <TableCell>{renderCell(projectTask, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <Pagination
                className="flex justify-center"
                total={totalPage}
                current={currentPage}
                onChange={onPageChange}
            />
        </>
    );
}