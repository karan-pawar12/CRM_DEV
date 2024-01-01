import { useState,useRef,useEffect } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Tooltip, Pagination } from "@nextui-org/react";

export default function DynamicTable({onPageChange,renderCell,data,columns,count}) {
    const [totalPage, setTotalPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const limit = useRef(10);


    
    useEffect(() => {
        calculateTotalPage();
    }, [count]);


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

    return (
        <>
            <div>
                <Table aria-label="Example static collection table">
                    <TableHeader columns={columns}>
                        {(column) => (
                            <TableColumn key={column.key} align="start">
                                {column.name}
                            </TableColumn>
                        )}
                    </TableHeader>
                    <TableBody items={data}>
                        {(item) => (

                            <TableRow key={item._id}>

                                {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <Pagination
                className="flex justify-center"
                total={totalPage}
                page={currentPage}
                onChange={onPageChange}
            />
        </>
    )
}