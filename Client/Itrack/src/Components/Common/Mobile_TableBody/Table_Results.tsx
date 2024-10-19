import React from 'react';
import { Link } from 'react-router-dom';
import { TableRow, TableCell, Typography } from '@mui/material';

interface TableProps {
    ID?: any;
    Navigate?:any;
    FirstOutput: any;
    ThirdOutput?: any;
    SecondOutput: any;
}

const TableResults:React.FC<TableProps> = ({ID, Navigate, FirstOutput, SecondOutput, ThirdOutput,}) => {
return (
    <TableRow key={ID} sx={{ borderBottom: '1px solid black', display: 'flex', justifyContent: 'space-between', height: '45px' ,margin: 'auto', width: '360px' , overflow: 'hidden' }}>
        <TableCell><Typography sx={{ fontSize: 17, width: '90px'}}><Link to={Navigate} className='text-black no-underline'>{FirstOutput}</Link></Typography></TableCell>
        <TableCell><Typography sx={{ fontSize: 17, minWidth: '90px'}}><Link to={Navigate} className='text-black no-underline'>{SecondOutput}</Link></Typography></TableCell>
        <TableCell><Typography sx={{ fontSize: 17, width: '90px'}}><Link to={Navigate} className='text-black no-underline'>{ThirdOutput}</Link></Typography></TableCell>
    </TableRow>
)
}

export default React.memo(TableResults)
