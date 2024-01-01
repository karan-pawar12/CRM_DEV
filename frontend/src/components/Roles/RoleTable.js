import React, { useCallback, useContext, useState, useEffect,useRef } from "react";
import { Button, Input } from '@nextui-org/react';
import { EditIcon, DeleteIcon, EyeIcon } from "../../resources/icons/icons";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Tooltip, Pagination } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import deleteRole_api from "../../api_strings/admin/deleteRole_api";
import getAllRole_api from "../../api_strings/admin/getAllRole_api";
import AuthContext from "../../AuthContext";
import AdminContext from "../../AdminContext";
const limit = 10;



function RoleTable({ roles, setRoles,onPageChange,count,settotalCount }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage,setTotalPage] = useState(1);
    const [searchKey, setSearchKey] = useState("");
    const authContext = useContext(AuthContext);
    const { openConfirmationModal, closeConfirmationModal } = useContext(AdminContext);
    const skip = useRef(0);
    const limit = useRef(10);
    const navigate = useNavigate();


    useEffect(()=>{
        calculateTotalPage();
    },[count])


    function handleDetailsRoleClick(roleId){
        navigate(`?id=${roleId}`);
    }

    const handleSearchQuery = (e) => {
        const currValue = e.target.value;
        setSearchKey(currValue);
        getAllRole_api({skip:skip.current,limit:limit.current,searchQuery:currValue},(error, res) => {
            if (error) {
              console.log("Error:", error);
            } else {
      
              setRoles(res.data.roles);
              settotalCount(res.data.totalCount);
      
            }
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
                                <EyeIcon onClick={() => handleDetailsRoleClick(role._id)}/>
                            </span>
                        </Tooltip>}
                        {authContext.auth.permissions["roles"]?.delete && <Tooltip color="danger" content="Delete user">
                            <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                <DeleteIcon onClick={() => handleDeleteRoleClick(role._id)}/>
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
                         value={searchKey}
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

            <Table aria-label="Example static collection table">
                <TableHeader columns={columns}>
                    {
                        (column) => (
                            <TableColumn key={column.key} align="start">
                                {column.name}
                            </TableColumn>
                        )
                    }
                </TableHeader>
                <TableBody items={roles}>
                    {(role) => (

                        <TableRow key={role._id}>

                            {(columnKey) => <TableCell>{renderCell(role, columnKey)}</TableCell>}
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

    )
}

export default RoleTable;