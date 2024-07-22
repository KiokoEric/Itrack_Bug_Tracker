import React from 'react';
import {  TableHead, TableRow, TableCell, Typography } from '@mui/material'

interface TableHeadProps {
    FirstHeading: string;
    ThirdHeading: string;
    FifthHeading?: string;
    SixthHeading?: string;
    SecondHeading: string;
    FourthHeading: string;
    EighthHeading?: string;
    SeventhHeading?: string;
}

const TableHeading: React.FC<TableHeadProps> = ({ FirstHeading, SecondHeading, ThirdHeading, FourthHeading, FifthHeading, SixthHeading, SeventhHeading, EighthHeading}) => {
return (
    <TableHead>
        <TableRow sx={{ display: 'flex', justifyContent: 'space-between', height: '40px' , minWidth: '1100px', overflowY: 'hidden' }}>
                <TableCell align='center'><Typography sx={{ fontWeight: 'bold' }}>{FirstHeading}</Typography></TableCell>
                <TableCell align='center'><Typography sx={{ fontWeight: 'bold' }}>{SecondHeading}</Typography></TableCell>
                <TableCell align='center'><Typography sx={{ fontWeight: 'bold' }}>{ThirdHeading}</Typography></TableCell>
                <TableCell align='center'><Typography sx={{ fontWeight: 'bold' }}>{FourthHeading}</Typography></TableCell>
                <TableCell align='center'><Typography sx={{ fontWeight: 'bold' }}>{FifthHeading}</Typography></TableCell>
                <TableCell align='center'><Typography sx={{ fontWeight: 'bold' }}>{SixthHeading}</Typography></TableCell>
                <TableCell align='center'><Typography sx={{ fontWeight: 'bold' }}>{SeventhHeading}</Typography></TableCell>
                <TableCell align='center'><Typography sx={{ fontWeight: 'bold' }}>{EighthHeading}</Typography></TableCell>
        </TableRow>
    </TableHead>
)
}

export default TableHeading