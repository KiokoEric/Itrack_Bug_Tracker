import React from 'react';
import { MdDelete } from "react-icons/md";
import { FaArchive } from "react-icons/fa";
import { MdEditDocument } from "react-icons/md";
import { TableRow, TableCell, Typography } from '@mui/material';

interface TableBodyProps {
    Navigate?: (e: React.MouseEvent<SVGAElement>) => void;
    Delete?: (e: React.MouseEvent<SVGAElement>) => void;
    Archive?: (e: React.MouseEvent<SVGAElement>) => void;
    ID: any
    TableStyle?: string;
    FirstOutput: any;
    ThirdOutput: string;
    FifthOutput?: string;
    SixthOutput?: string;
    SecondOutput: string;
    FourthOutput: string;
    SeventhOutput?: string;
}

const TableOutput:React.FC<TableBodyProps> = ({ ID,FirstOutput, SecondOutput, ThirdOutput, FourthOutput, FifthOutput, SixthOutput, SeventhOutput, Navigate, Delete, Archive }) => {
return (
    <TableRow key={ID} sx={{ borderBottom: '1px solid black', display: 'flex', justifyContent: 'space-between', height: '40px', width: '1150px' , overflow: 'hidden' }}>
        <TableCell align='center' ><Typography sx={{ fontSize: 17 }}>{FirstOutput}</Typography></TableCell>
        <TableCell align='center' ><Typography sx={{ fontSize: 17 }}>{SecondOutput}</Typography></TableCell>
        <TableCell align='center' ><Typography sx={{ fontSize: 17 }}>{ThirdOutput}</Typography></TableCell>
        <TableCell align='center' ><Typography sx={{ fontSize: 17 }}>{FourthOutput}</Typography></TableCell>
        <TableCell align='center' ><Typography sx={{ fontSize: 17 }}>{FifthOutput}</Typography></TableCell>
        <TableCell align='center' ><Typography sx={{ fontSize: 17 }}>{SixthOutput}</Typography></TableCell>
        <TableCell align='center' ><Typography sx={{ fontSize: 17 }}>{SeventhOutput}</Typography></TableCell>
        <TableCell>
            <MdEditDocument size="1rem" className='bg-red-700' color="black" onClick={Navigate} />
            <MdDelete size="1rem" className='bg-red-700' color="black" onClick={Delete} /> 
            <FaArchive size="1rem" className='bg-red-700' color="black" onClick={Archive} /> 
        </TableCell>
    </TableRow>
)
}

export default TableOutput