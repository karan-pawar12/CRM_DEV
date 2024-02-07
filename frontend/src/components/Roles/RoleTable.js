import React, { useCallback, useContext, useState, useEffect, useRef } from "react";
import { Button, Input } from '@nextui-org/react';
import { EditIcon, DeleteIcon, EyeIcon } from "../../resources/icons/icons";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Tooltip, Pagination } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import deleteRole_api from "../../api_strings/admin/deleteRole_api";
import getAllRole_api from "../../api_strings/admin/getAllRole_api";
import AuthContext from "../../AuthContext";
import AdminContext from "../../AdminContext";
import DynamicTable from "../DynamicTables/Table";
const limit = 10;



function RoleTable({ roles, setRoles, onPageChange, count, settotalCount, filter, setFilter }) {
    const [searchKey, setSearchKey] = useState("");
    const authContext = useContext(AuthContext);
    const { openConfirmationModal, closeConfirmationModal } = useContext(AdminContext);
    const skip = useRef(0);
    const limit = useRef(10);
    const navigate = useNavigate();



    function handleDetailsRoleClick(roleId) {
        navigate(`?id=${roleId}`);
    }

    const handleSearchQuery = (e) => {
        const currValue = e.target.value;
        setFilter((old) => {
            let temp = JSON.parse(JSON.stringify(old));
            temp.searchQuery = currValue;
            return temp;
        });
    }

    function handleDeleteRoleClick(roleId) {
        openConfirmationModal('Are you sure you want to delete this role ?', () => {
            deleteRole_api(roleId, (error, res) => {
                if (error) {
                    console.log("Error:", error);
                } else {

                    setRoles((roles) => roles.filter((role) => role._id !== roleId))
                }
            })
        })
    }



    const columns = [
        { name: "Name", key: "name" },
        { name: "Description", key: "description" },
        { name: "ACTIONS", key: "actions" },
    ]

    const handleCreateRoleClick = () => {
        navigate(`?id=new`);
    }

    const renderCell = useCallback((role, columnKey) => {
        switch (columnKey) {
            case "name":
                return <span>{role.name}</span>;
            case "description":
                return (
                    <span>
                        {role.description}
                    </span>
                )
            case "actions":
                return (
                    <div className="relative flex items-center gap-3">
                        {authContext.auth.permissions["roles"]?.update && <Tooltip content="Details">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <EyeIcon onClick={() => handleDetailsRoleClick(role._id)} />
                            </span>
                        </Tooltip>}
                        {authContext.auth.permissions["roles"]?.delete && <Tooltip color="danger" content="Delete user">
                            <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                <DeleteIcon onClick={() => handleDeleteRoleClick(role._id)} />
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
                {authContext.auth.permissions["roles"]?.create &&
                    <div className='flex justify-between'>
                        <div>
                            <Input placeholder='Search users' className='w-auto'
                                value={filter.searchQuery}
                                onChange={handleSearchQuery}
                            />
                        </div>
                        <div>

                            <Button color='primary' className='mr-4' onClick={handleCreateRoleClick}>
                                Create Roles
                            </Button>


                            <Button color='primary'>
                                Export to CSV
                            </Button>
                        </div>
                    </div>
                }
            </div>
            <DynamicTable onPageChange={onPageChange} renderCell={renderCell} data={roles} columns={columns} count={count} />
        </>

    )
}

export default RoleTable;