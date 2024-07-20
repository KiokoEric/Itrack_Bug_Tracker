import React from 'react';
import {  TableHead, TableRow, TableCell, Typography } from '@mui/material'

interface TableHeadProps {
    TableStyle?: string;
    FirstHeading: string;
    ThirdHeading: string;
    FifthHeading: string;
    SixthHeading: string;
    SecondHeading: string;
    FourthHeading: string;
    EighthHeading: string;
    SeventhHeading: string;
}

const TableHeading: React.FC<TableHeadProps> = ({ FirstHeading, SecondHeading, ThirdHeading, FourthHeading, FifthHeading, SixthHeading, SeventhHeading, EighthHeading, TableStyle }) => {
return (
    <TableHead>
        <TableRow>
            <TableCell align='center'><Typography sx={{ fontWeight: 'bold' }}>{FirstHeading}</Typography></TableCell>
            <TableCell align='center'><Typography sx={{ fontWeight: 'bold' }}>{SecondHeading}</Typography></TableCell>
            <TableCell align='center'><Typography sx={{ fontWeight: 'bold' }}>{ThirdHeading}</Typography></TableCell>
            <TableCell align='center'><Typography sx={{ fontWeight: 'bold' }}>{FourthHeading}</Typography></TableCell>
            <section className={TableStyle} >
                <TableCell align='center'><Typography sx={{ fontWeight: 'bold' }}>{FifthHeading}</Typography></TableCell>
                <TableCell align='center'><Typography sx={{ fontWeight: 'bold' }}>{SixthHeading}</Typography></TableCell>
                <TableCell align='center'><Typography sx={{ fontWeight: 'bold' }}>{SeventhHeading}</Typography></TableCell>
                <TableCell align='center'><Typography sx={{ fontWeight: 'bold' }}>{EighthHeading}</Typography></TableCell>
            </section>
        </TableRow>
    </TableHead>
)
}

export default TableHeading