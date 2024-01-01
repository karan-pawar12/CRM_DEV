import React, { useCallback, useContext, useState, useEffect, useRef } from "react";
import { Button, Input } from '@nextui-org/react';
import { EditIcon, DeleteIcon, EyeIcon } from "../../resources/icons/icons";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Tooltip, Pagination } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import deleteRole_api from "../../api_strings/admin/deleteRole_api";
import getAllTask_api from '../../api_strings/admin/createTask_api';
import AuthContext from "../../AuthContext";
import AdminContext from "../../AdminContext";
import DynamicTable from "../DynamicTables/Table";



function TaskTable({ tasks, setTasks, onPageChange, count, settotalCount }) {
    const [searchKey, setSearchKey] = useState("");
    const authContext = useContext(AuthContext);
    const { openConfirmationModal } = useContext(AdminContext);
    const skip = useRef(0);
    const limit = useRef(10);
    const navigate = useNavigate();



    function handleDetailsTaskClick(taskId) {
        navigate(`?id=${taskId}`);
    }

    const handleSearchQuery = (e) => {
        const currValue = e.target.value;
        setSearchKey(currValue);
        getAllTask_api({ skip: skip.current, limit: limit.current, searchQuery: currValue }, (error, res) => {
            if (error) {
                console.log("Error:", error);
            } else {

                setTasks(res.data.tasks);
                settotalCount(res.data.totalCount);

            }
        });
    }

    function handleDeleteTaskClick(taskId) {
        openConfirmationModal('Are you sure you want to delete this role ?', () => {
            deleteRole_api(taskId, (error, res) => {
                if (error) {
                    console.log("Error:", error);
                } else {

                    setTasks((tasks) => tasks.filter((task) => task._id !== taskId))
                }
            })
        })
    }

    const columns = [
        { name: "Subject", key: "taskSubject" },
        { name: "Due Date", key: "dueDate" },
        { name: "Status", key: "status" },
        { name: "Priority", key: "priority" },
        { name: "Related To", key: "participant" },
        { name: "ACTIONS", key: "actions" },
    ]

    const handleCreateTaskClick = () => {
        navigate(`?id=new`);
    }

    const renderCell = useCallback((task, columnKey) => {
        switch (columnKey) {
            case "taskSubject":
                return <span>{task.taskSubject}</span>;
            case "dueDate":
                return (
                    <span>
                        {task.dueDate}
                    </span>
                );
            case "status":
                return (
                    <span>
                        {task.status}
                    </span>
                );
            case "priority":
                return (
                    <span>
                        {task.priority}
                    </span>
                );
            case "participant":
                return (
                    <span>
                        {task.participant}
                    </span>
                )
            case "actions":
                return (
                    <div className="relative flex items-center gap-3">
                        {authContext.auth.permissions["tasks"]?.update && <Tooltip content="Details">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <EyeIcon onClick={() => handleDetailsTaskClick(task._id)} />
                            </span>
                        </Tooltip>}
                        {authContext.auth.permissions["tasks"]?.delete && <Tooltip color="danger" content="Delete user">
                            <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                <DeleteIcon onClick={() => handleDeleteTaskClick(task._id)} />
                            </span>
                        </Tooltip>}
                    </div>
                );
            default:
                return "";
        }
    }, []);


    return (
        <>
            <div className='mt-4 mb-6'>
                {authContext.auth.permissions["tasks"]?.create &&
                    <div className='flex justify-between'>
                        <div>
                            <Input placeholder='Search users' className='w-auto'
                                value={searchKey}
                                onChange={handleSearchQuery}
                            />
                        </div>
                        <div>

                            <Button color='primary' className='mr-4' onClick={handleCreateTaskClick}>
                                Create Task
                            </Button>


                            <Button color='primary'>
                                Export to CSV
                            </Button>
                        </div>
                    </div>
                }
            </div>

            <DynamicTable onPageChange={onPageChange} renderCell={renderCell} data={tasks} columns={columns} count={count}/>
        </>

    )
}

export default TaskTable;