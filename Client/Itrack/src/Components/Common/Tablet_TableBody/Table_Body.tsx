import React from 'react';
import { Link } from 'react-router-dom';
import { TableRow, TableCell, Typography } from '@mui/material';

interface TableBodyProps {
    ID: any
    Navigate?: any;
    FirstOutput: any;
    TableStyle?: string;
    ThirdOutput: string;
    FifthOutput?: string;
    SixthOutput?: string;
    SecondOutput: string;
    FourthOutput: string;
}

const Table_Body:React.FC<TableBodyProps> = ({ ID, Navigate, FirstOutput, SecondOutput, ThirdOutput, FourthOutput, FifthOutput, SixthOutput }) => {
return (
    <TableRow key={ID} sx={{ borderBottom: '1px solid black', display: 'flex', alignContent: 'center',  justifyContent: 'space-between', height: '45px' ,margin: 'auto', width: '725px' , overflow: 'hidden' }}>
        <TableCell><Typography sx={{ fontSize: 17, width: '100px'  }}><Link to={Navigate} className='text-black no-underline'>{FirstOutput}</Link></Typography></TableCell>
        <TableCell><Typography sx={{ fontSize: 17, width: '100px'  }}><Link to={Navigate} className='text-black no-underline'>{SecondOutput}</Link></Typography></TableCell>
        <TableCell><Typography sx={{ fontSize: 17, width: '100px'  }}><Link to={Navigate} className='text-black no-underline'>{ThirdOutput}</Link></Typography></TableCell>
        <TableCell><Typography sx={{ fontSize: 17, width: '100px'  }}><Link to={Navigate} className='text-black no-underline'>{FourthOutput}</Link></Typography></TableCell>
        <TableCell><Typography sx={{ fontSize: 17, width: '100px'  }}><Link to={Navigate} className='text-black no-underline'>{FifthOutput}</Link></Typography></TableCell>
    </TableRow>
)}

export default React.memo(Table_Body)
