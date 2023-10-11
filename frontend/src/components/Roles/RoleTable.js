import { Button, Input } from '@nextui-org/react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Tooltip, Pagination } from "@nextui-org/react";

function RoleTable() {
    return (
        <div className='mt-4 mb-6'>
            <div className='flex justify-between'>
                <div>
                    <Input placeholder='Search users' className='w-auto' />
                </div>
                <div>

                    <Button color='primary' className='mr-4'>
                        Create Leads
                    </Button>


                    <Button color='primary'>
                        Export to CSV
                    </Button>
                </div>
            </div>

        </div>
    )
}

export default RoleTable;