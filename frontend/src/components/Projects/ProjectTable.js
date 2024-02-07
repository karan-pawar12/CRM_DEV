import React, { useCallback, useContext, useState, useEffect, useRef } from "react";
import { EditIcon, DeleteIcon, EyeIcon } from "../../resources/icons/icons";
import { Button, Input } from '@nextui-org/react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Tooltip, Pagination } from "@nextui-org/react";
import deleteProject_api from "../../api_strings/admin/deleteProject_api";
import getAllProject_api from '../../api_strings/admin/getAllProject_api'
import { useNavigate } from 'react-router-dom';
import AuthContext from "../../AuthContext";
import AdminContext from "../../AdminContext";
import DynamicTable from "../DynamicTables/Table";


export default function ProjectTable({ projects, setProjects, onPageChange, count, settotalCount, filter, setFilter }) {
    const [searchKey, setSearchKey] = useState("");
    const authContext = useContext(AuthContext);
    const skip = useRef(0);
    const limit = useRef(10);
    const { openConfirmationModal, closeConfirmationModal } = useContext(AdminContext);
    const navigate = useNavigate();







    const handleCreateProjectClick = () => {
        // Use the navigate function to navigate to the new URL
        navigate(`new`);
    };

    const handleSearchQuery = (e) => {
        const currValue = e.target.value;
        setFilter((old) => {
            let temp = JSON.parse(JSON.stringify(old));
            temp.searchQuery = currValue;
            return temp;
        });
    }

    function handleDeleteProjectClick(projectId) {
        openConfirmationModal('Are you sure you want to delete this project ?', () => {
            deleteProject_api(projectId, (error, res) => {
                if (error) {
                    console.log("Error:", error);
                } else {

                    setProjects((projects) => projects.filter((project) => project._id !== projectId))
                }
            })
        })
    }

    function handleDetailsProjectClick(projectId) {
        navigate(`${projectId}`);
    }


    const renderCell = useCallback((project, columnKey) => {
        switch (columnKey) {
            case "projectName": // Concatenate first name and last name
                return <span>{`${project.projectName}`}</span>;
            case "createdBy":
                return <span>{`${project.createdBy.firstName}`}</span>;
            case "startDate":
                let startDate = new Date(project[columnKey]);
                return <span>{startDate.toLocaleDateString()}</span>
            case "endDate":
                let endDate = new Date(project[columnKey]);
                return <span>{endDate.toLocaleDateString()}</span>
            case "priority":
                return <span>{project.priority}</span>
            case "actions":
                return (
                    <div className="relative flex items-center gap-3">
                        {authContext.auth.permissions["projects"]?.update && <Tooltip content="Details">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <EyeIcon onClick={() => handleDetailsProjectClick(project._id)} />
                            </span>
                        </Tooltip>}
                        {authContext.auth.permissions["projects"]?.delete && <Tooltip color="danger" content="Delete project">
                            <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                <DeleteIcon onClick={() => handleDeleteProjectClick(project._id)} />
                            </span>
                        </Tooltip>}
                    </div>
                );
            default:
                return "";
        }
    }, []);

    const columns = [
        { name: "Project Name", key: "projectName" }, // Use "fullName" column for full name
        { name: "Owner", key: "createdBy" },
        { name: "Start Date", key: "startDate" },
        { name: "End Date", key: "endDate" },
        { name: "Priority", key: "priority" },
        { name: "ACTIONS", key: "actions" },
    ];



    return (
        <>
            <div className="mt-4 mb-6">
                {authContext.auth.permissions["projects"]?.create && <div className='flex justify-between'>
                    <div>
                        <Input placeholder='Search Project' className='w-auto'
                            value={filter.searchQuery}
                            onChange={handleSearchQuery}
                        />
                    </div>
                    <div>

                        <Button color='primary' className='mr-4' onClick={handleCreateProjectClick}>
                            Create Project
                        </Button>


                        <Button color='primary'>
                            Export to CSV
                        </Button>
                    </div>
                </div>}
            </div>

            <DynamicTable onPageChange={onPageChange} renderCell={renderCell} data={projects} columns={columns} count={count} />

        </>
    );
}
