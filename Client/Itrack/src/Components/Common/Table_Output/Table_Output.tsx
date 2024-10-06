import React from 'react';
import { Link } from 'react-router-dom';
import { TableRow, TableCell, Typography } from '@mui/material';

interface TableBodyProps {
    ID: any
    children?: any;
    Navigate?: any;
    FirstOutput: any;
    SeventhOutput?: any;
    TableStyle?: string;
    ThirdOutput: string;
    FifthOutput?: string;
    SixthOutput?: string;
    SecondOutput: string;
    FourthOutput: string;
}

const TableOutput:React.FC<TableBodyProps> = ({ ID, Navigate, FirstOutput, SecondOutput, ThirdOutput, FourthOutput, FifthOutput, SixthOutput, SeventhOutput, children }) => {
return (
    <TableRow key={ID} sx={{ borderBottom: '1px solid black', display: 'flex', alignContent: 'center',  justifyContent: 'space-between', height: '45px' ,margin: 'auto', width: '1150px' , overflow: 'hidden' }}>
            <TableCell><Typography sx={{ fontSize: 17, width: '115px'  }}><Link to={Navigate} className='text-black no-underline'>{FirstOutput}</Link></Typography></TableCell>
            <TableCell><Typography sx={{ fontSize: 17, width: '115px'  }}><Link to={Navigate} className='text-black no-underline'>{SecondOutput}</Link></Typography></TableCell>
            <TableCell><Typography sx={{ fontSize: 17, width: '115px'  }}><Link to={Navigate} className='text-black no-underline'>{ThirdOutput}</Link></Typography></TableCell>
            <TableCell><Typography sx={{ fontSize: 17, width: '115px'  }}><Link to={Navigate} className='text-black no-underline'>{FourthOutput}</Link></Typography></TableCell>
            <TableCell><Typography sx={{ fontSize: 17, width: '115px'  }}><Link to={Navigate} className='text-black no-underline'>{FifthOutput}</Link></Typography></TableCell>
            <TableCell><Typography sx={{ fontSize: 17, width: '115px'  }}><Link to={Navigate} className='text-black no-underline'>{SixthOutput}</Link></Typography></TableCell>
            <TableCell><Typography sx={{ fontSize: 17, width: '115px'  }}><Link to={Navigate} className='text-black no-underline'>{SeventhOutput}</Link></Typography></TableCell>
            <TableCell sx={{ display: 'flex', width: '115px' }}>
                {children}
            </TableCell>
    </TableRow>
)}

export default React.memo(TableOutput)
