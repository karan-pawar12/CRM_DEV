import React, { useCallback, useContext, useState, useEffect } from "react";
import { Button, Input } from '@nextui-org/react';
import { EditIcon, DeleteIcon, EyeIcon } from "../../resources/icons/icons";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Tooltip, Pagination } from "@nextui-org/react";
import AdminContext from '../../AdminContext';
import { useNavigate } from "react-router-dom";
import getAllRole_api from "../../api_strings/admin/getAllRole";
import deleteRole_api from "../../api_strings/admin/deleteRole_api";
const itemsPerPage = 10;



function RoleTable() {
    const [currentPage, setCurrentPage] = useState(1);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const adminContext = useContext(AdminContext);
    const navigate = useNavigate();


    useEffect(() => {
        getAllRole();
    }, [])

    function getAllRole() {
        getAllRole_api((error, res) => {
            if (error) {
                console.log("Error:", error);
            }
            else {
                adminContext.setRole(res.data);
            }
        })
    }

    function handleDetailsRoleClick(roleId){
        navigate(`?id=${roleId}`);
    }  
    
    function handleDeleteRoleClick(roleId) {
        deleteRole_api(roleId, (error, res) => {
            if (error) {
                console.log("Error:", error);
            } else {

                adminContext.setRole((roles) => roles.filter((role) => role._id !== roleId))
            }
        })
    }


    const columns = [
        { name: "Name", key: "name" },
        { name: "Permissions", key: "permissions" },
        { name: "ACTIONS", key: "actions" },
    ]

    const handleCreateRoleClick = () => {
        navigate(`?id=new`);
    }

    const renderCell = useCallback((role, columnKey) => {
        switch (columnKey) {
            case "name":
                return <span>{role.name}</span>;
            case "permissions":
                return (
                    <span>
                        {role.permissions.length > 0
                            ? role.permissions.join(", ") // Join permissions with a comma
                            : "No roles available"}
                    </span>
                )
            case "actions":
                return (
                    <div className="relative flex items-center gap-3">
                        <Tooltip content="Details">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <EyeIcon onClick={() => handleDetailsRoleClick(role._id)}/>
                            </span>
                        </Tooltip>
                        <Tooltip color="danger" content="Delete user">
                            <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                <DeleteIcon onClick={() => handleDeleteRoleClick(role._id)}/>
                            </span>
                        </Tooltip>
                    </div>
                );
            default:
                return "";
        }
    }, []);


    return (
        <>
            <div className='mt-4 mb-6'>
                <div className='flex justify-between'>
                    <div>
                        <Input placeholder='Search users' className='w-auto' />
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
            </div>

            <Table aria-label="Example static collection table" selectionMode='multiple'>
                <TableHeader columns={columns}>
                    {
                        (column) => (
                            <TableColumn key={column.key} align="start">
                                {column.name}
                            </TableColumn>
                        )
                    }
                </TableHeader>
                <TableBody items={adminContext.role.filter(role => !role.softDelete).slice(startIndex, endIndex)}>
                    {(role) => (

                        <TableRow key={role._id}>

                            {(columnKey) => <TableCell>{renderCell(role, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <Pagination
                className="flex justify-center"
                total={adminContext.lead.length}
                pageSize={itemsPerPage}
                current={currentPage}
                onChange={(newPage) => setCurrentPage(newPage)}
            />
        </>

    )
}

export default RoleTable;